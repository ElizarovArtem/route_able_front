import '@tensorflow/tfjs-backend-webgl';

import * as tf from '@tensorflow/tfjs-core';
import * as posedetection from '@tensorflow-models/pose-detection';
import React from 'react';

type Options = {
  targetFps?: number;
  scoreThreshold?: number;
  modelType?: 'lightning' | 'thunder';
  modelUrl?: string; // если хостишь у себя
};

function isVideoReady(video: HTMLVideoElement) {
  return (
    video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
    video.videoWidth > 0 &&
    video.videoHeight > 0 &&
    !video.paused &&
    !video.ended
  );
}

async function waitForVideoReady(
  getVideo: () => HTMLVideoElement | null,
  timeoutMs = 4000,
) {
  const start = performance.now();
  // ждём появления самого элемента
  while (!getVideo()) {
    if (performance.now() - start > timeoutMs) return false;
    await new Promise((r) => setTimeout(r, 40));
  }
  // ждём метаданных/размеров/плей
  while (true) {
    const video = getVideo();
    if (!video) break;
    if (video.readyState < HTMLMediaElement.HAVE_METADATA) {
      await new Promise<void>((resolve) =>
        video.addEventListener('loadedmetadata', () => resolve(), {
          once: true,
        }),
      );
    }
    if (video.paused) {
      try {
        await video.play();
      } catch {
        /* ignore */
      }
    }
    if (isVideoReady(video)) return true;
    if (performance.now() - start > timeoutMs) return false;
    await new Promise((r) => setTimeout(r, 40));
  }
  return false;
}

let tfReadyOnce: Promise<void> | null = null;
async function ensureTfBackendReady() {
  if (!tfReadyOnce) {
    tfReadyOnce = (async () => {
      await tf.ready();
      if (tf.getBackend() !== 'webgl') {
        await tf.setBackend('webgl');
        await tf.ready();
      }
    })();
  }
  return tfReadyOnce;
}

export function usePoseDetectorController(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  onPoseDetected: (keypoints: posedetection.Keypoint[]) => void,
  options: Options = {},
) {
  const {
    targetFps = 15,
    scoreThreshold = 0.5,
    modelType = 'lightning',
    modelUrl = '/models/movenet/singlepose/lightning/model.json',
  } = options;

  const requestIdRef = React.useRef<number | null>(null);
  const poseDetectorRef = React.useRef<posedetection.PoseDetector | null>(null);
  const isRunningRef = React.useRef(false);

  const stopDetector = React.useCallback(async () => {
    isRunningRef.current = false;
    if (requestIdRef.current) {
      cancelAnimationFrame(requestIdRef.current);
      requestIdRef.current = null;
    }
    if (poseDetectorRef.current) {
      await poseDetectorRef.current.dispose();
      poseDetectorRef.current = null;
    }
    // ВАЖНО: НЕ делаем tf.engine().reset(), если TFJS используется ещё где-то в приложении
  }, []);

  const startDetector = React.useCallback(async () => {
    if (isRunningRef.current) return; // уже запущен
    const video = videoRef.current;

    if (!video) return;

    // 1) ждём backend
    await ensureTfBackendReady();

    // 2) создаём детектор, если его нет
    if (!poseDetectorRef.current) {
      const detectorOptions: any = {
        modelType:
          modelType === 'thunder'
            ? posedetection.movenet.modelType.SINGLEPOSE_THUNDER
            : posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      };
      if (modelUrl) detectorOptions.modelUrl = modelUrl;

      poseDetectorRef.current = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet,
        detectorOptions,
      );
    }

    // 4) запускаем цикл (один экземпляр)
    isRunningRef.current = true;
    let lastInferenceTimestamp = 0;
    const minIntervalMs = 1000 / targetFps;

    const detectionLoop = async (timestampMs: number) => {
      if (!isRunningRef.current) return;
      requestIdRef.current = requestAnimationFrame(detectionLoop);

      const activeDetector = poseDetectorRef.current;
      const currentVideo = videoRef.current;
      if (!activeDetector || !currentVideo) return;
      if (!isVideoReady(currentVideo)) return;
      if (timestampMs - lastInferenceTimestamp < minIntervalMs) return;

      lastInferenceTimestamp = timestampMs;

      const poses = await activeDetector.estimatePoses(currentVideo, {
        maxPoses: 1,
        flipHorizontal: false, // зеркалим только UI, не вход модели
      });

      const keypoints =
        poses[0]?.keypoints?.filter(
          (kp) => (kp.score ?? 0) >= scoreThreshold,
        ) ?? [];
      onPoseDetected(keypoints as any);
    };

    requestIdRef.current = requestAnimationFrame(detectionLoop);
  }, [
    modelType,
    modelUrl,
    onPoseDetected,
    scoreThreshold,
    targetFps,
    videoRef,
    requestIdRef,
  ]);

  // авто-очистка при размонтировании компонента
  React.useEffect(() => {
    return () => {
      stopDetector();
    };
  }, [stopDetector]);

  return { startDetector, stopDetector, isRunningRef };
}
