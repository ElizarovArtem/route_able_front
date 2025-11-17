import type { Keypoint } from '@tensorflow-models/pose-detection';

import { DEFAULT_THRESHOLDS } from './aiAssistant.tips.squat.constants.ts';
import {
  measureMetricsForFront,
  measureMetricsForSide,
} from './aiAssistant.tips.squat.ts';
import {
  type CameraView,
  type FrameMetrics,
  type FrontTrendState,
  RepPhase,
  type SideTrendState,
  type Thresholds,
  type Tip,
  type TipContext,
  type TipProvider,
  type TrackerUpdateResult,
} from './aiAssistant.tips.squat.types.ts';

export class SquatRepTracker {
  private sideState: SideTrendState = {
    emaAngle: null,
    prevAngle: null,
    repMinKneeAngle: null,
  };
  private frontState: FrontTrendState = {
    emaDepth: null,
    prevDepth: null,
    repMaxDepthRatio: null,
  };

  private currentPhase: RepPhase = RepPhase.Standing;
  private prevPhase: RepPhase = RepPhase.Standing;
  private hadIssuesInThisRep = false;
  private reachedParallelThisRep = false;

  private lastTipAtByText = new Map<string, number>();
  private lastPraiseAt = 0;

  constructor(
    private currentView: CameraView,
    private readonly tipProviders: TipProvider[], // ⚡️ сюда складываем функции подсказок
    private readonly thresholds: Thresholds = DEFAULT_THRESHOLDS,
  ) {}

  /** Полная зачистка состояния (при смене вида/упражнения/камеры и т.п.) */
  reset(nextView?: CameraView, opts: { keepTipCooldown?: boolean } = {}) {
    if (nextView) this.currentView = nextView;

    // фазы
    this.prevPhase = RepPhase.Standing;
    this.currentPhase = RepPhase.Standing;

    // флаги текущего повтора
    this.hadIssuesInThisRep = false;
    this.reachedParallelThisRep = false;

    // тренд-состояния (EMA, предыдущее значение, экстремум)
    // если ты уже используешь sideState/frontState — обнуляем их:
    // (если ещё держишь старые поля emaSide/prevAngle — обнули и их)
    this.sideState = { emaAngle: null, prevAngle: null, repMinKneeAngle: null };
    this.frontState = {
      emaDepth: null,
      prevDepth: null,
      repMaxDepthRatio: null,
    };

    // антиспам подсказок
    if (!opts.keepTipCooldown) this.lastTipAtByText.clear();

    // антиспам похвалы
    this.lastPraiseAt = 0;
  }

  /** Вычисление обновлений в повторе для текущего кадра  */
  update(keypoints: Keypoint[]): TrackerUpdateResult {
    let frameMetrics: FrameMetrics;
    let velocity: number | null;

    if (this.currentView === 'side') {
      const res = measureMetricsForSide(keypoints, this.sideState, {
        emaAlpha: 0.4,
      });
      this.sideState = res.state;
      frameMetrics = res.metrics;
      velocity = res.velocity;
    } else {
      const res = measureMetricsForFront(keypoints, this.frontState, {
        emaAlpha: 0.4,
      });
      this.frontState = res.state;
      frameMetrics = res.metrics;
      velocity = res.velocity;
    }

    const isStandingNow =
      frameMetrics.view === 'side'
        ? frameMetrics.kneeAngleDegrees != null &&
          frameMetrics.kneeAngleDegrees >= this.thresholds.kneeAngleStandingDeg
        : frameMetrics.depthRatio != null &&
          frameMetrics.depthRatio < this.thresholds.depthRatioStanding;

    // 3) смена фазы по развороту тренда
    let nextPhase = this.currentPhase;
    let isFirstFrameInAscending = false;

    if (isStandingNow) {
      nextPhase = RepPhase.Standing;
      // сброс экстремумов для нового спуска
      this.sideState.repMinKneeAngle = null;
      this.frontState.repMaxDepthRatio = null;
    } else {
      if (frameMetrics.view === 'side') {
        // спуск: угол уменьшается (velocity < 0), подъём: угол растёт (velocity > 0)
        if (
          (this.currentPhase === RepPhase.Standing ||
            this.currentPhase === RepPhase.Ascending) &&
          velocity != null &&
          velocity < -this.thresholds.velEpsAngle
        ) {
          nextPhase = RepPhase.Descending;
        } else if (
          (this.currentPhase === RepPhase.Descending ||
            this.currentPhase === RepPhase.Bottom) &&
          velocity != null &&
          velocity > this.thresholds.velEpsAngle
        ) {
          nextPhase = RepPhase.Ascending;
          isFirstFrameInAscending = true;
        } else if (
          this.currentPhase === RepPhase.Descending &&
          velocity != null &&
          Math.abs(velocity) <= this.thresholds.velEpsAngle
        ) {
          nextPhase = RepPhase.Bottom;
        }
      } else {
        // анфас: глубина растёт на спуске (velocity > 0), падает на подъёме (velocity < 0)
        if (
          (this.currentPhase === RepPhase.Standing ||
            this.currentPhase === RepPhase.Ascending) &&
          velocity != null &&
          velocity > this.thresholds.velEpsDepth
        ) {
          nextPhase = RepPhase.Descending;
        } else if (
          (this.currentPhase === RepPhase.Descending ||
            this.currentPhase === RepPhase.Bottom) &&
          velocity != null &&
          velocity < -this.thresholds.velEpsDepth
        ) {
          nextPhase = RepPhase.Ascending;
          isFirstFrameInAscending = true;
        } else if (
          this.currentPhase === RepPhase.Descending &&
          velocity != null &&
          Math.abs(velocity) <= this.thresholds.velEpsDepth
        ) {
          nextPhase = RepPhase.Bottom;
        }
      }
    }

    // 4) применяем фазу и отмечаем достижения цели по ЭКСТРЕМУМУ повтора
    const phaseChanged = nextPhase !== this.currentPhase;
    const prevPhase = this.currentPhase;
    this.prevPhase = prevPhase;
    this.currentPhase = nextPhase;

    if (frameMetrics.view === 'side') {
      const minAngle = frameMetrics.repMinKneeAngle;
      if (
        minAngle != null &&
        minAngle <= this.thresholds.kneeAngleParallelDeg
      ) {
        this.reachedParallelThisRep = true;
      }
    } else {
      const maxDepth = frameMetrics.repMaxDepthRatio;
      if (maxDepth != null && maxDepth >= this.thresholds.depthRatioParallel) {
        this.reachedParallelThisRep = true;
      }
    }

    // 5) завершение повтора: Ascending → Standing → возможно, praise
    if (
      prevPhase === RepPhase.Ascending &&
      this.currentPhase === RepPhase.Standing
    ) {
      const shouldPraise =
        this.reachedParallelThisRep && !this.hadIssuesInThisRep;

      // сброс под следующий повтор
      this.hadIssuesInThisRep = false;
      this.reachedParallelThisRep = false;

      if (shouldPraise) {
        const now = Date.now();
        if (now - this.lastPraiseAt >= this.thresholds.praiseCooldownMs) {
          this.lastPraiseAt = now;
          return {
            phase: this.currentPhase,
            tips: [],
            event: 'praise',
            praise: 'Отличный повтор! Всё по технике ✅',
          };
        }
      }

      return {
        phase: this.currentPhase,
        tips: [],
        event: 'phase-change',
      };
    }

    // 6) Standing (и это не закрытие повтора) — тишина
    if (this.currentPhase === RepPhase.Standing) {
      return {
        phase: this.currentPhase,
        tips: [],
        event: phaseChanged ? 'phase-change' : 'none',
      };
    }

    // 7) собираем подсказки провайдерами
    const context: TipContext = {
      keypoints,
      view: this.currentView,
      phase: this.currentPhase,
      prevPhase: this.prevPhase,
      isFirstFrameInAscending,
      metrics: frameMetrics,
    };
    const rawTips = this.runTipProviders(context);

    if (rawTips.some((t) => t.severity === 'warn' || t.severity === 'error')) {
      this.hadIssuesInThisRep = true;
    }

    const tips = this.applyTipsCooldown(rawTips);

    return {
      phase: this.currentPhase,
      tips,
      event: phaseChanged ? 'phase-change' : 'none',
    };
  }

  // =============== Подсказчики и антиспам ===============

  private runTipProviders(context: TipContext): Tip[] {
    // В Standing подсказки не считаем (страховка)
    if (context.phase === RepPhase.Standing) return [];
    let tips: Tip[] = [];
    for (const provider of this.tipProviders) {
      const got = provider(context) ?? [];
      if (got.length) tips = tips.concat(got);
    }
    return tips;
  }

  private applyTipsCooldown(tips: Tip[]): Tip[] {
    const now = Date.now();
    const result: Tip[] = [];
    for (const tip of tips) {
      const lastAt = this.lastTipAtByText.get(tip.text) ?? 0;
      if (now - lastAt >= this.thresholds.tipsGlobalCooldownMs) {
        this.lastTipAtByText.set(tip.text, now);
        result.push(tip);
      }
    }
    return result;
  }
}
