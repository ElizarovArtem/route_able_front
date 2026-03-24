import '@livekit/components-styles';

import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import classNames from 'classnames';
import React, { useMemo } from 'react';

import {
  EARLY_JOIN_MINUTES,
  LATE_JOIN_MINUTES,
  lessonStatusLabels,
} from '@/c.widgets/lessons/model/videoLessons.constants.ts';
import { useConfirmWorkoutByCoach } from '@/d.features/lessons/api/queries/useConfirmWorkoutByCoach.ts';
import { useGetVideoLessons } from '@/e.entities/lessons';
import { useCanJoin } from '@/e.entities/lessons/api/queries/useCanJoin.ts';
import { LessonStatus } from '@/e.entities/lessons/model/lessons.types.ts';
import { CoachWorkoutSession } from '@/e.entities/lessons/ui/CoachWorkoutSession/CoachWorkoutSession.tsx';
import { Roles } from '@/e.entities/user';
import { useGetVideoToken } from '@/e.entities/user';
import { UiButton, UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

import {
  formatRange,
  isWithinJoinWindow,
  normalizeVideoLessons,
} from '../../model/videoLessons.helpers';
import styles from './VideoLessonFromCoach.module.scss';

type VideoChatProps = {
  relationId?: string;
  meRole?: Roles;
};

export const VideoLessonFromCoach = ({ relationId }: VideoChatProps) => {
  const router = useRouter();

  if (!relationId) {
    router.navigate({ to: '/' });

    return <></>;
  }

  const queryClient = useQueryClient();
  const { data: lessons, refetch } = useGetVideoLessons(relationId);
  const { data: canJoin } = useCanJoin(relationId);
  const { mutate: confirmByCoachMutation } = useConfirmWorkoutByCoach({
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
  }, [normalizedLessons, canJoin?.session]);

  const {
    data: tokenPayload,
    isFetching: isTokenFetching,
    refetch: refetchToken,
  } = useGetVideoToken(relationId, { enabled: !!canJoin?.session });

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
        !lesson.coachMarkedCompletedAt &&
        lesson.status === LessonStatus.COMPLETED,
    );
  }, [normalizedLessons]);

  const onConfirmWorkout = (lessonId: string) => {
    confirmByCoachMutation({
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
        <UiCard>
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
        </UiCard>
      )}

      {!tokenPayload && (
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

          <UiFlex direction="column">
            <UiCard>
              <UiTypography>
                Подключение к видеозвонку станет доступно за&nbsp;
                {EARLY_JOIN_MINUTES} минут до начала и ещё&nbsp;
                {LATE_JOIN_MINUTES} минут после завершения урока.
              </UiTypography>

              {upcomingLesson && (
                <UiTypography type="label">
                  Ближайший урок: {formatRange(upcomingLesson)}
                </UiTypography>
              )}
            </UiCard>

            <UiCard>
              <UiFlex direction="column">
                <UiTypography bold>Запланированные занятия</UiTypography>
                <UiFlex direction="column" gap="s">
                  {normalizedLessons.length ? (
                    normalizedLessons.map((lesson) => {
                      return (
                        <UiCard
                          inverse
                          key={lesson.id}
                          className={classNames(styles.lessonItem, {
                            [styles.lessonItemActive]:
                              lesson.id === upcomingLesson?.id,
                          })}
                        >
                          <UiFlex justify="space-between">
                            <UiFlex>
                              <UiTypography>{formatRange(lesson)}</UiTypography>
                              <UiTypography type="label">
                                {lessonStatusLabels[lesson.status]}
                              </UiTypography>
                              <UiTypography bold>
                                Занятие подтверждено тренером
                              </UiTypography>
                            </UiFlex>
                            {lesson.status === LessonStatus.COMPLETED &&
                              !lesson.coachMarkedCompletedAt && (
                                <UiButton
                                  onClick={() => onConfirmWorkout(lesson.id)}
                                >
                                  Подтвердить проведение занятия
                                </UiButton>
                              )}
                          </UiFlex>
                        </UiCard>
                      );
                    })
                  ) : (
                    <UiTypography>
                      На данный момент занятий не запланировано
                    </UiTypography>
                  )}
                </UiFlex>
              </UiFlex>
            </UiCard>
          </UiFlex>
        </UiFlex>
      )}
    </>
  );
};
