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
  ExerciseKey,
  getTracker,
  PoseOverlay,
  RepPhase,
  speakText,
  type Tip,
  type TrackerController,
  useGetAiAssistantToken,
  usePoseDetectorController,
} from '@/e.entities/aiAssistant';
import {
  EXERCISE_VIEWS,
  ViewAngle,
} from '@/e.entities/aiAssistant/model/aiAssistant.model.ts';
import { UiButton, UiCard, UiFlex, UiSelector } from '@/f.shared/ui';
import { UiSwitch } from '@/f.shared/ui/UiSwitch/UiSwitch.tsx';

import styles from './aiAssistant.module.scss';

const MODE_OPTIONS: DefaultOptionType[] = [
  { value: ExerciseKey.SQUAT, label: 'Приседания' },
  { value: ExerciseKey.PUSHUP, label: 'Отжимания' },
];

type AiAssistantProps = {
  needHeader?: boolean;
  externalMode?: ExerciseKey;
  externalStart?: boolean;
  externalView?: ViewAngle;
};

export const AiAssistant = ({
  needHeader = true,
  externalMode,
  externalStart,
  externalView,
}: AiAssistantProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackerRef = useRef<TrackerController | null>(null);
  const lastPhaseRef = useRef<RepPhase>(RepPhase.Standing);

  const [mode, setMode] = useState<ExerciseKey | undefined>(externalMode);
  const selectedMode = externalMode ?? mode;

  const viewOptions = useMemo((): DefaultOptionType[] => {
    return selectedMode
      ? (EXERCISE_VIEWS[selectedMode] || []).map((view) => ({
          value: view,
          label: view === ViewAngle.side ? 'Сбоку' : 'Спереди',
        }))
      : [];
  }, [selectedMode]);

  const [view, setView] = useState<ViewAngle>(
    (viewOptions[0]?.value || ViewAngle.side) as ViewAngle,
  );

  const [keypoints, setKeypoints] = useState<Keypoint[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [textTips, setTextTips] = useState<Tip[]>([]);
  const [hasVideo, setHasVideo] = useState(false);
  const [needVoiceHelper, setNeedVoiceHelper] = useState(false);

  const [start, setStart] = useState(false);

  const currentStart = externalStart ?? start;

  const roomId = useMemo(
    () => (selectedMode ? `ai-assistant-${selectedMode}` : undefined),
    [selectedMode],
  );

  const { data: tokenPayload } = useGetAiAssistantToken(roomId);

  const handlePoseDetected = useCallback((keypoints: Keypoint[]) => {
    const tracker = trackerRef.current;
    if (!tracker) return;

    const result = tracker.update(keypoints);

    if (result.event === 'praise') {
      setTips([{ severity: 'success', text: result.praise, rep: result.rep }]);
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
        setHasVideo(true);
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
  }, [tokenPayload, roomId, currentStart]);

  useEffect(() => {
    if (tips.length === 0) return;

    setTextTips((prevState) => [...prevState, ...tips].slice(-20));

    if (needVoiceHelper) {
      tips.forEach((tip) => speakText(tip.text));
    }
  }, [needVoiceHelper, tips]);

  useEffect(() => {
    trackerRef.current = getTracker(view, selectedMode);
    lastPhaseRef.current = RepPhase.Standing;
    setTips([]);
    setTextTips([]);
  }, [selectedMode, view]);

  useEffect(() => {
    if (externalView) {
      setView(externalView);
      return;
    }

    const nextView = viewOptions[0]?.value;
    if (nextView) {
      setView(nextView as ViewAngle);
    }
  }, [externalView, viewOptions]);

  useEffect(() => {
    if (currentStart && hasVideo) {
      startDetector();
    }
  }, [currentStart, hasVideo, startDetector]);

  return (
    <UiFlex direction="column">
      {needHeader && (
        <UiCard className={styles.controlWrapper}>
          <UiFlex>
            <UiSwitch
              label="Включить голосовые подсказки"
              checked={needVoiceHelper}
              onChange={onChangeNeedVoiceHelper}
            />
            <UiSelector
              className={styles.selector}
              options={MODE_OPTIONS}
              onChange={setMode}
              placeholder="Выберите упражнение"
            />
            <UiSelector
              className={styles.selector}
              options={viewOptions}
              onChange={setView}
              placeholder="Выберите вид"
              disabled={!selectedMode}
            />
            <UiButton
              disabled={!selectedMode && !view}
              onClick={() => toggleStart(!currentStart)}
            >
              {currentStart ? 'Закончить' : 'Начать'}
            </UiButton>
          </UiFlex>
        </UiCard>
      )}

      {tokenPayload && currentStart && (
        <div className={styles.lessonRoom}>
          <UiCard className={styles.videoContainer}>
            <LiveKitRoom
              video
              audio
              token={tokenPayload.token}
              serverUrl={tokenPayload.url}
              connect={currentStart}
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
    </UiFlex>
  );
};
