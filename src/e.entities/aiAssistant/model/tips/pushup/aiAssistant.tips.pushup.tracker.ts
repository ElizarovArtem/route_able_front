import type { Keypoint } from '@tensorflow-models/pose-detection';

import { RepTracker } from '../aiAssistant.tips.repTracker.ts';
import type { CameraView } from '../aiAssistant.tips.shared.types.ts';
import { RepPhase } from '../aiAssistant.tips.shared.types.ts';
import { PUSHUP_THRESHOLDS } from './aiAssistant.tips.pushup.constants.ts';
import {
  measurePushupMetricsForFront,
  measurePushupMetricsForSide,
} from './aiAssistant.tips.pushup.ts';
import type {
  PushupFrameMetrics,
  PushupThresholds,
  PushupTipContext,
  PushupTipProvider,
  PushupTrendState,
} from './aiAssistant.tips.pushup.types.ts';

const createInitialState = (): PushupTrendState => ({
  emaElbowAngle: null,
  prevElbowAngle: null,
  repMinElbowAngle: null,
  emaDepthRatio: null,
  prevDepthRatio: null,
  repMaxDepthRatio: null,
});

export class PushupRepTracker extends RepTracker<
  PushupFrameMetrics,
  PushupTipContext,
  PushupThresholds
> {
  private state: PushupTrendState = createInitialState();

  constructor(
    view: CameraView,
    providers: PushupTipProvider[],
    thresholds: PushupThresholds = PUSHUP_THRESHOLDS,
  ) {
    super(view, providers, thresholds);
  }

  protected resetState(): void {
    this.state = createInitialState();
  }

  protected onTopReached(): void {
    this.state.repMinElbowAngle = null;
    this.state.repMaxDepthRatio = null;
  }

  protected measure(
    keypoints: Keypoint[],
  ): { metrics: PushupFrameMetrics; velocity: number | null } {
    if (this.currentView === 'side') {
      const res = measurePushupMetricsForSide(keypoints, this.state, {
        emaAlpha: 0.4,
      });
      this.state = res.state;
      return { metrics: res.metrics, velocity: res.velocity };
    }
    const res = measurePushupMetricsForFront(keypoints, this.state, {
      emaAlpha: 0.4,
    });
    this.state = res.state;
    return { metrics: res.metrics, velocity: res.velocity };
  }

  protected isTopNow(metrics: PushupFrameMetrics): boolean {
    return metrics.view === 'side'
      ? metrics.elbowAngleDegrees != null &&
          metrics.elbowAngleDegrees >= this.thresholds.elbowAngleTopDeg
      : this.state.emaDepthRatio != null &&
          this.state.emaDepthRatio <= this.thresholds.frontDepthTopRatio;
  }

  protected isDepthReached(metrics: PushupFrameMetrics): boolean {
    return metrics.view === 'side'
      ? metrics.repMinElbowAngle != null &&
          metrics.repMinElbowAngle <= this.thresholds.elbowAngleBottomDeg
      : this.state.repMaxDepthRatio != null &&
          this.state.repMaxDepthRatio >= this.thresholds.frontDepthBottomRatio;
  }

  protected buildContext(params: {
    keypoints: Keypoint[];
    phase: RepPhase;
    prevPhase: RepPhase;
    isFirstFrameInAscending: boolean;
    velocity: number | null;
    metrics: PushupFrameMetrics;
  }): PushupTipContext {
    return { ...params, view: this.currentView };
  }

  protected getPraiseText(): string {
    return 'Отличный повтор! Всё по технике ✅';
  }
}
