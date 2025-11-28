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
  getTracker,
  PoseOverlay,
  RepPhase,
  speakText,
  SquatRepTracker,
  type Tip,
  useGetAiAssistantToken,
  usePoseDetectorController,
} from '@/e.entities/aiAssistant';
import { UiButton, UiCard, UiSelector } from '@/f.shared/ui';
import { UiSwitch } from '@/f.shared/ui/UiSwitch/UiSwitch.tsx';

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
  const [needVoiceHelper, setNeedVoiceHelper] = useState(false);

  const [start, setStart] = useState(false);

  const roomId = useMemo(() => `ai-assistant-${mode}`, [mode]);

  const { data: tokenPayload } = useGetAiAssistantToken(roomId);

  const handlePoseDetected = useCallback((keypoints: Keypoint[]) => {
    const tracker = trackerRef.current!;
    const result = tracker.update(keypoints);

    if (result.event === 'praise') {
      setTips([
        {
          severity: 'success',
          text: 'Отличный повтор! Всё по технике ✅',
          rep: result.rep,
        },
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
      setTextTips([]);
    } else {
      await stopDetector();
      trackerRef.current?.reset();
      setStart(false);
      setKeypoints([]);
      setTips([]);
    }
  };

  const onChangeNeedVoiceHelper = (checked: boolean) =>
    setNeedVoiceHelper(checked);

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

    if (needVoiceHelper) {
      tips.forEach((tip) => speakText(tip.text));
    }
  }, [tips]);

  useEffect(() => {
    trackerRef.current = getTracker(mode);
    lastPhaseRef.current = RepPhase.Standing;
    setTips([]);
    setTextTips([]);
  }, [mode]);

  useEffect(() => {
    if (start && hasVideo) {
      startDetector();
    }
  }, [start, hasVideo, startDetector]);

  return (
    <div className={styles.aiAssistantWrapper}>
      <UiCard className={styles.controlWrapper}>
        <UiSelector
          className={styles.selector}
          options={MODE_OPTIONS}
          onChange={setMode}
          placeholder="Выберите упражнение"
        />
        <UiButton disabled={!mode} onClick={() => toggleStart(!start)}>
          {start ? 'Закончить' : 'Начать'}
        </UiButton>
        <UiSwitch
          label="Включить голосовые подсказки"
          checked={needVoiceHelper}
          onChange={onChangeNeedVoiceHelper}
        />
      </UiCard>

      {tokenPayload && start && (
        <div className={styles.lessonRoom}>
          <UiCard className={styles.videoContainer}>
            <LiveKitRoom
              video
              audio
              token={tokenPayload.token}
              serverUrl={tokenPayload.url}
              connect={start}
            >
              <VideoConference />
            </LiveKitRoom>
          </UiCard>

          <PoseOverlay video={videoRef.current} keypoints={keypoints} />

          {textTips.length > 0 && (
            <UiCard className={styles.tips}>
              {textTips.map((tip, index) => (
                <UiCard key={tip.text + index} inverse>
                  Повтор {tip.rep}: {tip.text}
                </UiCard>
              ))}
            </UiCard>
          )}
        </div>
      )}
    </div>
  );
};
