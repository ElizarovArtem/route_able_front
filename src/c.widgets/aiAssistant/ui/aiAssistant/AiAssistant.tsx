import '@livekit/components-styles';

import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import type { Keypoint } from '@tensorflow-models/pose-detection';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ExerciseMode,
  PoseOverlay,
  RepPhase,
  speakText,
  SquatRepTracker,
  type Tip,
  useGetAiAssistantToken,
  usePoseDetectorController,
} from '@/e.entities/aiAssistant';
import { getTracker } from '@/e.entities/aiAssistant/model/tips/aiAssistant.tips.ts';
import { UiButton, UiSelector } from '@/f.shared/ui';

import styles from './aiAssistant.module.scss';

const MODE_OPTIONS: DefaultOptionType[] = [
  { value: ExerciseMode.squatFront, label: 'Приседания - Вид спереди' },
  { value: ExerciseMode.squatSide, label: 'Приседания - Вид сбоку' },
];

export const AiAssistant = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackerRef = useRef<SquatRepTracker | null>(null);
  const lastPhaseRef = useRef<RepPhase>(RepPhase.Standing);

  const [mode, setMode] = useState<ExerciseMode>();

  const [keypoints, setKeypoints] = useState<Keypoint[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [textTips, setTextTips] = useState<Tip[]>([]);
  const [hasVideo, setHasVideo] = useState(false);

  const [start, setStart] = useState(false);

  const roomId = useMemo(() => `ai-assistant-${mode}`, [mode]);

  const { data: tokenPayload } = useGetAiAssistantToken(roomId);

  const handlePoseDetected = useCallback((keypoints: Keypoint[]) => {
    const tracker = trackerRef.current!;
    const result = tracker.update(keypoints);

    if (result.event === 'praise') {
      setTips([
        { severity: 'success', text: 'Отличный повтор! Всё по технике ✅' },
      ]);
      lastPhaseRef.current = result.phase;
      return;
    }

    // Если просто фаза сменилась — можно логировать/подсветить фазу
    if (result.event === 'phase-change') {
      // console.log('phase:', result.phase);
    }

    setTips(result.tips);
    setKeypoints(keypoints);

    lastPhaseRef.current = result.phase;
  }, []);

  const { startDetector, stopDetector } = usePoseDetectorController(
    videoRef,
    handlePoseDetected,
  );

  const toggleStart = async (value: boolean) => {
    if (value) {
      setStart(true);
    } else {
      await stopDetector();
      trackerRef.current?.reset();
      setStart(false);
      setKeypoints([]);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const selector =
      'video[data-lk-local-participant="true"][data-lk-source="camera"]';

    const attachIfFound = () => {
      const liveKitVideo = document.querySelector<HTMLVideoElement>(selector);
      if (liveKitVideo && liveKitVideo !== videoRef.current) {
        videoRef.current = liveKitVideo;
        return true;
      }
      return !!liveKitVideo;
    };

    if (!attachIfFound()) {
      const mutationObserver = new MutationObserver(() => {
        if (attachIfFound()) {
          setHasVideo(true);
          mutationObserver.disconnect();
        }
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
      return () => mutationObserver.disconnect();
    }
  }, [tokenPayload, roomId, start]);

  useEffect(() => {
    setTextTips((prevState) => [...prevState, ...tips]);
    tips.forEach((tip) => speakText(tip.text));
  }, [tips]);

  useEffect(() => {
    trackerRef.current = getTracker(mode);
    lastPhaseRef.current = RepPhase.Standing;
    setTips([]);
  }, [mode]);

  useEffect(() => {
    if (start && hasVideo) {
      startDetector();
    }
  }, [start, hasVideo, startDetector]);

  return (
    <div>
      <div className={styles.controlWrapper}>
        <UiSelector
          className={styles.selector}
          options={MODE_OPTIONS}
          onChange={setMode}
          placeholder="Выберите упражнение"
        />
        <UiButton disabled={!mode} onClick={() => toggleStart(!start)}>
          {start ? 'Закончить' : 'Начать'}
        </UiButton>
      </div>

      {tokenPayload && (
        <div className={styles.lessonRoom}>
          <div className={styles.videoContainer}>
            <LiveKitRoom
              video
              audio
              token={tokenPayload.token}
              serverUrl={tokenPayload.url}
              connect={start}
            >
              <VideoConference />
            </LiveKitRoom>
          </div>

          <PoseOverlay video={videoRef.current} keypoints={keypoints} />

          <div className={styles.tips}>
            {textTips.map((tip, index) => (
              <div key={tip.text + index}>{tip.text}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
