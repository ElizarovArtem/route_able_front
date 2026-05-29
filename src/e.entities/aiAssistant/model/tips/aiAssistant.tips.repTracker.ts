import type { Keypoint } from '@tensorflow-models/pose-detection';

import {
  type BaseThresholds,
  type BaseTipContext,
  type CameraView,
  type ProviderTip,
  RepPhase,
  type Tip,
  type TipProvider,
  type TrackerUpdateResult,
} from './aiAssistant.tips.shared.types.ts';

export abstract class RepTracker<
  TMetrics,
  TContext extends BaseTipContext<TMetrics>,
  TThresholds extends BaseThresholds,
> {
  protected currentPhase: RepPhase = RepPhase.Standing;
  protected prevPhase: RepPhase = RepPhase.Standing;

  private hadIssuesInThisRep = false;
  private reachedDepthThisRep = false;
  private completedReps = 0;
  private activeRepNumber: number | null = null;
  private lastTipAtByText = new Map<string, number>();
  private lastPraiseAt = 0;

  constructor(
    protected currentView: CameraView,
    private readonly providers: TipProvider<TContext>[],
    protected readonly thresholds: TThresholds,
  ) {}

  // ── hooks implemented by each exercise ──────────────────────────────────────

  protected abstract measure(keypoints: Keypoint[]): {
    metrics: TMetrics;
    velocity: number | null;
  };

  protected abstract isTopNow(metrics: TMetrics): boolean;
  protected abstract isDepthReached(metrics: TMetrics): boolean;

  protected abstract buildContext(params: {
    keypoints: Keypoint[];
    phase: RepPhase;
    prevPhase: RepPhase;
    isFirstFrameInAscending: boolean;
    velocity: number | null;
    metrics: TMetrics;
  }): TContext;

  protected abstract getPraiseText(): string;

  protected onTopReached(): void {}
  protected resetState(): void {}

  // ── public API ───────────────────────────────────────────────────────────────

  reset(nextView?: CameraView, opts: { keepTipCooldown?: boolean } = {}): void {
    if (nextView) this.currentView = nextView;
    this.prevPhase = RepPhase.Standing;
    this.currentPhase = RepPhase.Standing;
    this.hadIssuesInThisRep = false;
    this.reachedDepthThisRep = false;
    this.completedReps = 0;
    this.activeRepNumber = null;
    this.lastPraiseAt = 0;
    this.resetState();
    if (!opts.keepTipCooldown) this.lastTipAtByText.clear();
  }

  update(keypoints: Keypoint[]): TrackerUpdateResult {
    const { metrics, velocity } = this.measure(keypoints);

    const isTop = this.isTopNow(metrics);
    let nextPhase = this.currentPhase;
    let isFirstFrameInAscending = false;

    if (isTop) {
      nextPhase = RepPhase.Standing;
      this.onTopReached();
    } else {
      const velEps =
        this.currentView === 'side'
          ? this.thresholds.velEpsAngle
          : this.thresholds.velEpsDepth;

      // side: knee angle decreases on descent → velocity < 0
      // front: depth ratio increases on descent → velocity > 0
      const goingDown =
        this.currentView === 'side'
          ? velocity != null && velocity < -velEps
          : velocity != null && velocity > velEps;
      const goingUp =
        this.currentView === 'side'
          ? velocity != null && velocity > velEps
          : velocity != null && velocity < -velEps;
      const atBottom = velocity != null && Math.abs(velocity) <= velEps;

      if (
        (this.currentPhase === RepPhase.Standing ||
          this.currentPhase === RepPhase.Ascending) &&
        goingDown
      ) {
        nextPhase = RepPhase.Descending;
      } else if (
        (this.currentPhase === RepPhase.Descending ||
          this.currentPhase === RepPhase.Bottom) &&
        goingUp
      ) {
        nextPhase = RepPhase.Ascending;
        isFirstFrameInAscending = true;
      } else if (this.currentPhase === RepPhase.Descending && atBottom) {
        nextPhase = RepPhase.Bottom;
      }
    }

    const phaseChanged = nextPhase !== this.currentPhase;
    const prevPhase = this.currentPhase;
    this.prevPhase = prevPhase;
    this.currentPhase = nextPhase;

    const startedRepNow =
      prevPhase === RepPhase.Standing &&
      this.currentPhase !== RepPhase.Standing;
    if (startedRepNow && this.activeRepNumber == null) {
      this.activeRepNumber = this.completedReps + 1;
    }

    if (this.isDepthReached(metrics)) {
      this.reachedDepthThisRep = true;
    }

    if (
      prevPhase === RepPhase.Ascending &&
      this.currentPhase === RepPhase.Standing
    ) {
      const repNumber = this.activeRepNumber ?? this.completedReps + 1;
      const shouldPraise = this.reachedDepthThisRep && !this.hadIssuesInThisRep;

      this.hadIssuesInThisRep = false;
      this.reachedDepthThisRep = false;
      this.activeRepNumber = null;
      this.completedReps += 1;

      if (shouldPraise) {
        const now = Date.now();
        if (now - this.lastPraiseAt >= this.thresholds.praiseCooldownMs) {
          this.lastPraiseAt = now;
          return {
            phase: this.currentPhase,
            tips: [],
            event: 'praise',
            praise: this.getPraiseText(),
            rep: repNumber,
          };
        }
      }

      return { phase: this.currentPhase, tips: [], event: 'phase-change' };
    }

    if (this.currentPhase === RepPhase.Standing) {
      return {
        phase: this.currentPhase,
        tips: [],
        event: phaseChanged ? 'phase-change' : 'none',
      };
    }

    const context = this.buildContext({
      keypoints,
      phase: this.currentPhase,
      prevPhase: this.prevPhase,
      isFirstFrameInAscending,
      velocity,
      metrics,
    });

    const rawTips = this.runProviders(context);

    if (rawTips.some((t) => t.severity === 'warn' || t.severity === 'error')) {
      this.hadIssuesInThisRep = true;
    }

    const repForTips = this.activeRepNumber ?? this.completedReps + 1;
    const tips: Tip[] = this.applyCooldown(rawTips).map((tip) => ({
      ...tip,
      rep: repForTips,
    }));

    return {
      phase: this.currentPhase,
      tips,
      event: phaseChanged ? 'phase-change' : 'none',
    };
  }

  // ── private ──────────────────────────────────────────────────────────────────

  private runProviders(context: TContext): ProviderTip[] {
    if (this.currentPhase === RepPhase.Standing) return [];
    return this.providers.flatMap((p) => p(context) ?? []);
  }

  private applyCooldown(tips: ProviderTip[]): ProviderTip[] {
    const now = Date.now();
    const result: ProviderTip[] = [];
    for (const tip of tips) {
      const cd = tip.cooldownMs ?? this.thresholds.tipsGlobalCooldownMs;
      const lastAt = this.lastTipAtByText.get(tip.text) ?? 0;
      if (now - lastAt >= cd) {
        this.lastTipAtByText.set(tip.text, now);
        result.push(tip);
      }
    }
    return result;
  }
}
