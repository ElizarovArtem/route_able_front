import type { Keypoint } from '@tensorflow-models/pose-detection';

import { RepTracker } from '../aiAssistant.tips.repTracker.ts';
import type { CameraView, TipProvider } from '../aiAssistant.tips.shared.types.ts';
import { RepPhase } from '../aiAssistant.tips.shared.types.ts';
import { DEFAULT_THRESHOLDS } from './aiAssistant.tips.squat.constants.ts';
import {
  measureMetricsForFront,
  measureMetricsForSide,
} from './aiAssistant.tips.squat.ts';
import type {
  FrameMetrics,
  FrontTrendState,
  SideTrendState,
  Thresholds,
  TipContext,
} from './aiAssistant.tips.squat.types.ts';

export class SquatRepTracker extends RepTracker<FrameMetrics, TipContext, Thresholds> {
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

  constructor(
    view: CameraView,
    providers: TipProvider<TipContext>[],
    thresholds: Thresholds = DEFAULT_THRESHOLDS,
  ) {
    super(view, providers, thresholds);
  }

  protected resetState(): void {
    this.sideState = { emaAngle: null, prevAngle: null, repMinKneeAngle: null };
    this.frontState = { emaDepth: null, prevDepth: null, repMaxDepthRatio: null };
  }

  protected onTopReached(): void {
    this.sideState.repMinKneeAngle = null;
    this.frontState.repMaxDepthRatio = null;
  }

  protected measure(
    keypoints: Keypoint[],
  ): { metrics: FrameMetrics; velocity: number | null } {
    if (this.currentView === 'side') {
      const res = measureMetricsForSide(keypoints, this.sideState, {
        emaAlpha: 0.4,
      });
      this.sideState = res.state;
      return { metrics: res.metrics, velocity: res.velocity };
    }
    const res = measureMetricsForFront(keypoints, this.frontState, {
      emaAlpha: 0.4,
    });
    this.frontState = res.state;
    return { metrics: res.metrics, velocity: res.velocity };
  }

  protected isTopNow(metrics: FrameMetrics): boolean {
    return metrics.view === 'side'
      ? metrics.kneeAngleDegrees != null &&
          metrics.kneeAngleDegrees >= this.thresholds.kneeAngleStandingDeg
      : metrics.depthRatio != null &&
          metrics.depthRatio < this.thresholds.depthRatioStanding;
  }

  protected isDepthReached(metrics: FrameMetrics): boolean {
    if (metrics.view === 'side') {
      return (
        metrics.repMinKneeAngle != null &&
        metrics.repMinKneeAngle <= this.thresholds.kneeAngleParallelDeg
      );
    }
    return (
      metrics.repMaxDepthRatio != null &&
      metrics.repMaxDepthRatio >= this.thresholds.depthRatioParallel
    );
  }

  protected buildContext(params: {
    keypoints: Keypoint[];
    phase: RepPhase;
    prevPhase: RepPhase;
    isFirstFrameInAscending: boolean;
    velocity: number | null;
    metrics: FrameMetrics;
  }): TipContext {
    return { ...params, view: this.currentView };
  }

  protected getPraiseText(): string {
    return 'Отличный повтор! Всё по технике ✅';
  }
}
