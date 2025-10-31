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

import { useGetAiAssistantToken } from '@/e.entities/aiAssistant';
import {
  ExerciseMode,
  getSquatTipsAdaptive,
  PoseOverlay,
  speakText,
  type Tip,
  usePoseDetectorController,
} from '@/e.entities/aiAssistant';
import { UiButton, UiInput, UiSelector } from '@/f.shared/ui';

import styles from './aiAssistant.module.scss';

const MODE_OPTIONS: DefaultOptionType[] = [
  { value: ExerciseMode.squat, label: 'Приседания' },
];

export const AiAssistant = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [mode, setMode] = useState<ExerciseMode>();
  const [keypoints, setKeypoints] = useState<Keypoint[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [textTips, setTextTips] = useState<Tip[]>([]);
  const [hasVideo, setHasVideo] = useState(false);

  const [start, setStart] = useState(false);

  const roomId = useMemo(() => `ai-assistant-${mode}`, [mode]);
  const { data: tokenPayload } = useGetAiAssistantToken(roomId);

  const getTipsFunction = useMemo(() => {
    switch (mode) {
      case ExerciseMode.squat:
        return getSquatTipsAdaptive;
      default:
        return () => [];
    }
  }, [mode]);

  const handlePoseDetected = useCallback(
    (kps: Keypoint[]) => {
      setKeypoints(kps);
      setTips(getTipsFunction(kps));
    },
    [getTipsFunction],
  );

  const { startDetector, stopDetector } = usePoseDetectorController(
    videoRef,
    handlePoseDetected,
  );

  const toggleStart = async (value: boolean) => {
    if (value) {
      setStart(true);
    } else {
      await stopDetector();
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
        <UiButton onClick={() => toggleStart(!start)}>
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
