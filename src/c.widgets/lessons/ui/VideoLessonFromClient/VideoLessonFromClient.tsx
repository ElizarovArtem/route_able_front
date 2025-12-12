import '@livekit/components-styles';

import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from '@tanstack/react-router';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';

import {
  EARLY_JOIN_MINUTES,
  LATE_JOIN_MINUTES,
  lessonStatusLabels,
  NOW_REFRESH_MS,
} from '@/c.widgets/lessons/model/videoLessons.constants.ts';
import { CancelLessonModal } from '@/d.features/lessons';
import { CreateVideoLessonModal } from '@/d.features/video';
import { useGetCoachSlots, useGetVideoLessons } from '@/e.entities/lessons';
import { LessonStatus } from '@/e.entities/lessons/model/lessons.model.ts';
import { LessonSlot, Roles, useGetVideoToken } from '@/e.entities/user';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import {
  UiButton,
  UiCard,
  UiDatepicker,
  UiFlex,
  UiTypography,
} from '@/f.shared/ui';

import {
  formatRange,
  isWithinJoinWindow,
} from '../../model/videoLessons.helpers';
import styles from './VideoLessonFromClient.module.scss';

type VideoChatProps = {
  relationId?: string;
  meRole?: Roles;
};

export const VideoLessonFromClient = ({ relationId }: VideoChatProps) => {
  const [now, setNow] = useState(() => new Date());
  const [date, setDate] = useState(new Date());
  const [slotId, setSlotId] = useState<string | null>(null);
  const [cancelLessonId, setCancelLessonId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const router = useRouter();
  const coachId = useParams({
    from: '/_private/coach/$coachId',
    select: (params) => params.coachId,
  });

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), NOW_REFRESH_MS);
    return () => window.clearInterval(id);
  }, []);

  if (!relationId) {
    router.navigate({ to: '/' });

    return <></>;
  }

  const { data: lessons } = useGetVideoLessons(relationId);
  const { data: slots } = useGetCoachSlots(coachId, formatDateForServer(date));

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

  const onCreateVideoLessonSuccess = () => {
    queryClient.refetchQueries({
      queryKey: ['coach-slots', coachId, formatDateForServer(date)],
    });
    queryClient.refetchQueries({
      queryKey: ['lessons', relationId],
    });
    setSlotId(null);
  };

  const onCancelVideoLessonSuccess = () => {
    queryClient.refetchQueries({
      queryKey: ['coach-slots', coachId, formatDateForServer(date)],
    });
    queryClient.refetchQueries({
      queryKey: ['lessons', relationId],
    });
    setCancelLessonId(null);
  };

  return (
    <>
      {activeLesson && (
        <>
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
        </>
      )}

      {!activeLesson && (
        <UiFlex direction="column">
          <UiFlex direction="column">
            <>
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
            </>

            <UiCard>
              <UiFlex direction="column">
                <UiFlex gap="s" align="center">
                  <UiTypography>Свободные слоты на:</UiTypography>
                  <UiDatepicker
                    defaultValue={date}
                    minDate={new Date()}
                    onChange={(date) => setDate(date as Date)}
                  />
                </UiFlex>
                <UiFlex>
                  {slots && slots.length ? (
                    slots.map((slot) => (
                      <LessonSlot
                        key={slot.id}
                        timeSlot={slot}
                        onClick={() => setSlotId(slot.id)}
                      />
                    ))
                  ) : (
                    <UiTypography>
                      Да эту дату свободных слотов нет
                    </UiTypography>
                  )}
                </UiFlex>
              </UiFlex>
            </UiCard>

            <>
              <UiFlex direction="column">
                <UiTypography bold>Запланированные занятия</UiTypography>
                <UiFlex
                  direction="column"
                  gap="s"
                  className={styles.lessonsList}
                >
                  {lessons?.length ? (
                    lessons.map((lesson) => {
                      return (
                        <UiCard
                          key={lesson.id}
                          className={classNames(styles.lessonItem, {
                            [styles.lessonItemActive]:
                              lesson.id === upcomingLesson?.id,
                          })}
                        >
                          <UiFlex justify="space-between">
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
                            <UiButton
                              styleType="danger"
                              onClick={() => setCancelLessonId(lesson.id)}
                            >
                              Отменить
                            </UiButton>
                          </UiFlex>
                        </UiCard>
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
        relationId={relationId}
        lessonId={cancelLessonId}
        onCancel={() => setCancelLessonId(null)}
        onSuccess={onCancelVideoLessonSuccess}
      />
    </>
  );
};
