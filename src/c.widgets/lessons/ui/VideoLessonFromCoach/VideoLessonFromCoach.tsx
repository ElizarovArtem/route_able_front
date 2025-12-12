import '@livekit/components-styles';

import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { useRouter } from '@tanstack/react-router';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';

import {
  EARLY_JOIN_MINUTES,
  LATE_JOIN_MINUTES,
  lessonStatusLabels,
  NOW_REFRESH_MS,
} from '@/c.widgets/lessons/model/videoLessons.constants.ts';
import { useGetVideoLessons } from '@/e.entities/lessons';
import { LessonStatus } from '@/e.entities/lessons/model/lessons.model.ts';
import { Roles } from '@/e.entities/user';
import { useGetVideoToken } from '@/e.entities/user';
import { UiButton, UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

import {
  formatRange,
  isWithinJoinWindow,
} from '../../model/videoLessons.helpers';
import styles from './VideoLessonFromCoach.module.scss';

type VideoChatProps = {
  relationId?: string;
  meRole?: Roles;
};

export const VideoLessonFromCoach = ({ relationId }: VideoChatProps) => {
  const [now, setNow] = useState(() => new Date());

  const router = useRouter();

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), NOW_REFRESH_MS);
    return () => window.clearInterval(id);
  }, []);

  if (!relationId) {
    router.navigate({ to: '/' });

    return <></>;
  }

  const { data: lessons } = useGetVideoLessons(relationId);

  const activeLesson = useMemo(() => {
    if (!lessons?.length) return null;

    return lessons.find((lesson) => isWithinJoinWindow(lesson, now)) ?? null;
  }, [lessons, now]);

  const joinEnabled = Boolean(activeLesson);

  const {
    data: tokenPayload,
    isFetching: isTokenFetching,
    refetch: refetchToken,
  } = useGetVideoToken(relationId, { enabled: joinEnabled });

  const upcomingLesson = useMemo(() => {
    if (!lessons?.length) return null;
    return (
      lessons.find((lesson) => {
        if (lesson.status === LessonStatus.CANCELED) return false;
        const start = new Date(lesson.startAt);
        return start.getTime() > now.getTime();
      }) ?? null
    );
  }, [lessons, now]);

  return (
    <>
      {activeLesson && (
        <UiCard>
          <UiFlex direction="column">
            <UiTypography>
              Идёт урок: {activeLesson ? formatRange(activeLesson) : 'сейчас'}
            </UiTypography>
            {activeLesson?.title && (
              <UiTypography type="label">{activeLesson.title}</UiTypography>
            )}
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
          </UiFlex>
        </UiCard>
      )}

      {!activeLesson && (
        <UiFlex direction="column">
          <UiFlex direction="column">
            <UiCard>
              <UiTypography>
                Подключение к видеозвонку станет доступно за&nbsp;
                {EARLY_JOIN_MINUTES} минут до начала и ещё&nbsp;
                {LATE_JOIN_MINUTES} минут после завершения урока.
              </UiTypography>

              {upcomingLesson && (
                <>
                  {upcomingLesson.title && (
                    <UiTypography bold>{upcomingLesson.title}</UiTypography>
                  )}
                  <UiTypography type="label">
                    Ближайший урок: {formatRange(upcomingLesson)}
                  </UiTypography>
                </>
              )}
            </UiCard>

            <UiCard>
              <UiFlex direction="column">
                <UiTypography bold>Расписание уроков</UiTypography>
                <UiFlex direction="column" gap="s">
                  {lessons?.length ? (
                    lessons.map((lesson) => {
                      return (
                        <UiCard
                          inverse
                          key={lesson.id}
                          className={classNames(styles.lessonItem, {
                            [styles.lessonItemActive]:
                              lesson.id === upcomingLesson?.id,
                          })}
                        >
                          <UiFlex direction="column">
                            <UiTypography>{formatRange(lesson)}</UiTypography>
                            {lesson.title && (
                              <UiTypography type="label">
                                {lesson.title}
                              </UiTypography>
                            )}
                            <UiTypography size="small" type="label">
                              Статус: {lessonStatusLabels[lesson.status]}
                            </UiTypography>
                          </UiFlex>
                        </UiCard>
                      );
                    })
                  ) : (
                    <UiTypography>
                      На данный момент занятий не запланировано, ознакомтесь со
                      свободными временными слотами тренера ниже
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
