import '@livekit/components-styles';

import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import React, { useMemo, useState } from 'react';

import {
  EARLY_JOIN_MINUTES,
  LATE_JOIN_MINUTES,
} from '@/c.widgets/lessons/model/videoLessons.constants.ts';
import { CancelLessonModal } from '@/d.features/lessons';
import { useConfirmWorkoutByClient } from '@/d.features/lessons/api/queries/useConfirmWorkoutByClient.ts';
import { CreateVideoLessonModal } from '@/d.features/video';
import { useGetVideoLessons } from '@/e.entities/lessons';
import { useCanJoin } from '@/e.entities/lessons/api/queries/useCanJoin.ts';
import { LessonStatus } from '@/e.entities/lessons/model/lessons.constants.ts';
import { CoachWorkoutSession } from '@/e.entities/lessons/ui/CoachWorkoutSession/CoachWorkoutSession.tsx';
import { Roles, useGetVideoToken } from '@/e.entities/user';
import { UiButton, UiFlex, UiTypography } from '@/f.shared/ui';

import {
  formatRange,
  isWithinJoinWindow,
  normalizeVideoLessons,
} from '../../model/videoLessons.helpers';
import styles from './VideoLessonFromClient.module.scss';

type VideoChatProps = {
  relationId?: string;
  meRole?: Roles;
};

export const VideoLessonFromClient = ({ relationId }: VideoChatProps) => {
  const [slotId, setSlotId] = useState<string | null>(null);
  const [cancelSessionId, setCancelSessionId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const router = useRouter();

  if (!relationId) {
    router.navigate({ to: '/' });

    return <></>;
  }

  const { data: lessons, refetch } = useGetVideoLessons(relationId);
  const { data: canJoin } = useCanJoin(relationId);
  const { mutate: confirmByClientMutation } = useConfirmWorkoutByClient({
    onSuccess: () => {
      refetch();
    },
  });

  const normalizedLessons = useMemo(
    () => normalizeVideoLessons(lessons),
    [lessons, canJoin?.session],
  );

  const activeLesson = useMemo(() => {
    if (!normalizedLessons.length) return null;
    return (
      normalizedLessons.find((lesson) => isWithinJoinWindow(lesson)) ?? null
    );
  }, [normalizedLessons]);

  const joinEnabled = Boolean(activeLesson);

  const {
    data: tokenPayload,
    isFetching: isTokenFetching,
    refetch: refetchToken,
  } = useGetVideoToken(relationId, { enabled: joinEnabled });

  const upcomingLesson = useMemo(() => {
    if (!normalizedLessons.length) return null;
    return (
      normalizedLessons.find((lesson) => {
        if (lesson.status === LessonStatus.CANCELED) return false;
        const start = new Date(lesson.startAt);
        return start.getTime() > new Date().getTime();
      }) ?? null
    );
  }, [normalizedLessons]);

  const notConfirmedLessons = useMemo(() => {
    return normalizedLessons.filter(
      (lesson) =>
        !lesson.clientConfirmedAt && lesson.status === LessonStatus.COMPLETED,
    );
  }, [normalizedLessons]);

  const onCreateVideoLessonSuccess = () => {
    queryClient.refetchQueries({
      queryKey: ['lessons', relationId],
    });
    setSlotId(null);
  };

  const onCancelVideoLessonSuccess = () => {
    queryClient.refetchQueries({
      queryKey: ['lessons', relationId],
    });
    setCancelSessionId(null);
  };

  const onConfirmWorkout = (lessonId: string) => {
    confirmByClientMutation({
      lessonId,
    });
  };

  const onVideoLessonEnd = () => {
    console.log('DADADAD');
    queryClient.setQueryData(['videoToken', relationId], null);
  };

  return (
    <>
      {tokenPayload && (
        <>
          <UiFlex direction="column">
            <UiTypography>
              Идёт урок: {activeLesson ? formatRange(activeLesson) : 'сейчас'}
            </UiTypography>
          </UiFlex>

          {tokenPayload && (
            <div className={styles.videoContainer}>
              <LiveKitRoom
                video
                audio
                token={tokenPayload.token}
                serverUrl={tokenPayload.url}
                connect
              >
                <VideoConference />
              </LiveKitRoom>
            </div>
          )}

          <UiFlex wrap="wrap">
            <UiTypography>
              При возникновении ошибок связи обновите токен
            </UiTypography>
            <UiButton onClick={() => refetchToken()} loading={isTokenFetching}>
              Обновить токен
            </UiButton>
            <UiButton onClick={onVideoLessonEnd} loading={isTokenFetching}>
              Завершить видеоурок
            </UiButton>
          </UiFlex>
        </>
      )}

      {!tokenPayload && (
        <UiFlex direction="column">
          <UiFlex direction="column">
            {notConfirmedLessons.length && (
              <>
                <UiTypography bold>Неподтвержденные занятия</UiTypography>
                <UiFlex>
                  {notConfirmedLessons.map((lesson) => (
                    <CoachWorkoutSession
                      key={lesson.id}
                      lesson={lesson}
                      onConfirmWorkout={onConfirmWorkout}
                    />
                  ))}
                </UiFlex>
              </>
            )}

            <>
              <UiTypography>
                Подключение к видеозвонку станет доступно за&nbsp;
                {EARLY_JOIN_MINUTES} минут до начала и ещё&nbsp;
                {LATE_JOIN_MINUTES} минут после завершения урока.
              </UiTypography>

              {upcomingLesson && (
                <>
                  <UiTypography type="label">
                    Ближайший урок: {formatRange(upcomingLesson)}
                  </UiTypography>
                </>
              )}
            </>

            <>
              <UiFlex direction="column">
                <UiTypography bold>Запланированные занятия</UiTypography>
                <UiFlex
                  direction="column"
                  gap="s"
                  className={styles.lessonsList}
                >
                  {normalizedLessons.length ? (
                    normalizedLessons.map((lesson) => {
                      return (
                        <CoachWorkoutSession
                          key={lesson.id}
                          lesson={lesson}
                          upcomingLesson={upcomingLesson}
                          onConfirmWorkout={onConfirmWorkout}
                          setCancelSessionId={setCancelSessionId}
                        />
                      );
                    })
                  ) : (
                    <UiTypography>
                      На данный момент занятий не запланировано, ознакомтесь со
                      свободными временными слотами тренера
                    </UiTypography>
                  )}
                </UiFlex>
              </UiFlex>
            </>
          </UiFlex>
        </UiFlex>
      )}

      <CreateVideoLessonModal
        slotId={slotId}
        onClose={() => setSlotId(null)}
        onSuccess={onCreateVideoLessonSuccess}
      />
      <CancelLessonModal
        sessionId={cancelSessionId}
        onCancel={() => setCancelSessionId(null)}
        onSuccess={onCancelVideoLessonSuccess}
      />
    </>
  );
};
