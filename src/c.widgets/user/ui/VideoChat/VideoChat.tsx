import '@livekit/components-styles';

import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { Spin } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';

import { CreateVideoLessonModal } from '@/d.features/video';
import { Roles } from '@/e.entities/user';
import { useGetVideoLessons, useGetVideoToken } from '@/e.entities/user/api';
import {
  LessonStatus,
  type VideoLessonDto,
} from '@/e.entities/user/api/requests/get-video-lessons.request.ts';
import { UiButton, UiCard, UiTypography } from '@/f.shared/ui';

import styles from './VideoChat.module.scss';

type VideoChatProps = {
  relationId?: string;
  meRole?: Roles;
};

const EARLY_JOIN_MINUTES = 5;
const LATE_JOIN_MINUTES = 10;
const NOW_REFRESH_MS = 30_000;

const lessonStatusLabels: Record<LessonStatus, string> = {
  [LessonStatus.SCHEDULED]: 'Запланирован',
  [LessonStatus.IN_PROGRESS]: 'В процессе',
  [LessonStatus.COMPLETED]: 'Завершён',
  [LessonStatus.CANCELED]: 'Отменён',
};

const formatRange = (lesson: VideoLessonDto) => {
  const start = new Date(lesson.startAt);
  const end = new Date(lesson.endAt);
  const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
  const endFormatter = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${dateFormatter.format(start)} — ${endFormatter.format(end)}`;
};

const isWithinJoinWindow = (lesson: VideoLessonDto, now: Date) => {
  if (lesson.status === LessonStatus.CANCELED) {
    return false;
  }
  const start = new Date(lesson.startAt);
  const end = new Date(lesson.endAt);

  const from = new Date(start.getTime() - EARLY_JOIN_MINUTES * 60_000);
  const to = new Date(end.getTime() + LATE_JOIN_MINUTES * 60_000);

  return now >= from && now <= to;
};

export const VideoChat = ({ relationId, meRole }: VideoChatProps) => {
  const [now, setNow] = useState(() => new Date());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), NOW_REFRESH_MS);
    return () => window.clearInterval(id);
  }, []);

  if (!relationId) {
    return (
      <UiCard className={styles.videoChatCard}>
        <UiTypography>
          Видеосвязь доступна только для активного подключения с клиентом.
        </UiTypography>
      </UiCard>
    );
  }

  const {
    data: lessons,
    isLoading: isLessonsLoading,
    isFetching: isLessonsFetching,
    isError: isLessonsError,
    refetch: refetchLessons,
  } = useGetVideoLessons(relationId);

  const activeLesson = useMemo(() => {
    if (!lessons?.length) return null;
    return lessons.find((lesson) => isWithinJoinWindow(lesson, now)) ?? null;
  }, [lessons, now]);

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

  const joinEnabled = Boolean(activeLesson);

  const {
    data: tokenPayload,
    isLoading: isTokenLoading,
    isFetching: isTokenFetching,
    isError: isTokenError,
    refetch: refetchToken,
  } = useGetVideoToken(relationId, { enabled: joinEnabled });

  const canSchedule = meRole === Roles.Coach || meRole === Roles.Client;

  const scheduleButton = canSchedule ? (
    <UiButton onClick={() => setIsCreateModalOpen(true)}>
      Запланировать урок
    </UiButton>
  ) : null;

  const lessonsList =
    lessons && lessons.length > 0 ? (
      <div className={styles.scheduleBlock}>
        <UiTypography bold>Расписание уроков</UiTypography>
        <div className={styles.lessonsList}>
          {lessons.map((lesson) => {
            const isActive = activeLesson?.id === lesson.id;
            return (
              <div
                key={lesson.id}
                className={classNames(styles.lessonItem, {
                  [styles.lessonItemActive]: isActive,
                })}
              >
                <div className={styles.lessonMeta}>
                  <UiTypography>{formatRange(lesson)}</UiTypography>
                  {lesson.title && (
                    <UiTypography type="label">{lesson.title}</UiTypography>
                  )}
                  <UiTypography size="small" type="label">
                    Статус: {lessonStatusLabels[lesson.status]}
                  </UiTypography>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : null;

  let content: React.ReactNode;

  if (isLessonsLoading && !lessons) {
    content = (
      <UiCard className={styles.videoChatCard}>
        <div className={styles.centeredRow}>
          <Spin size="large" />
        </div>
        {canSchedule && (
          <div className={styles.actionsRow}>{scheduleButton}</div>
        )}
      </UiCard>
    );
  } else if (isLessonsError) {
    content = (
      <UiCard className={styles.videoChatCard}>
        <UiTypography>
          Не удалось загрузить расписание видео-уроков. Попробуйте обновить
          страницу или повторить попытку позже.
        </UiTypography>
        <div className={styles.actionsRow}>
          <UiButton
            onClick={() => refetchLessons()}
            loading={isLessonsFetching}
          >
            Повторить попытку
          </UiButton>
          {scheduleButton}
        </div>
      </UiCard>
    );
  } else if (!lessons?.length) {
    content = (
      <UiCard className={styles.videoChatCard}>
        <UiTypography>
          Для этой пары пока нет запланированных видео-уроков.
        </UiTypography>
        <div className={styles.actionsRow}>
          <UiButton
            onClick={() => refetchLessons()}
            loading={isLessonsFetching}
          >
            Обновить расписание
          </UiButton>
          {scheduleButton}
        </div>
      </UiCard>
    );
  } else if (!joinEnabled) {
    content = (
      <UiCard className={styles.videoChatCard}>
        <div className={styles.infoBlock}>
          <UiTypography>
            Подключение к видеозвонку станет доступно за&nbsp;
            {EARLY_JOIN_MINUTES} минут до начала и ещё&nbsp;
            {LATE_JOIN_MINUTES} минут после завершения урока.
          </UiTypography>

          {upcomingLesson ? (
            <>
              {upcomingLesson.title && (
                <UiTypography bold>{upcomingLesson.title}</UiTypography>
              )}
              <UiTypography type="label">
                Ближайший урок: {formatRange(upcomingLesson)}
              </UiTypography>
            </>
          ) : (
            <UiTypography>
              Активных уроков сейчас нет. Проверьте расписание позже.
            </UiTypography>
          )}
        </div>

        {lessonsList}

        <div className={styles.actionsRow}>
          <UiButton
            onClick={() => refetchLessons()}
            loading={isLessonsFetching}
          >
            Обновить расписание
          </UiButton>
          {scheduleButton}
        </div>
      </UiCard>
    );
  } else if (isTokenError) {
    content = (
      <UiCard className={styles.videoChatCard}>
        <UiTypography>
          Не удалось получить доступ к видеозвонку. Попробуйте обновить токен.
        </UiTypography>
        <div className={styles.actionsRow}>
          <UiButton onClick={() => refetchToken()} loading={isTokenFetching}>
            Обновить токен
          </UiButton>
          <UiButton
            type="default"
            onClick={() => refetchLessons()}
            loading={isLessonsFetching}
          >
            Обновить расписание
          </UiButton>
          {scheduleButton}
        </div>
        {lessonsList}
      </UiCard>
    );
  } else if (
    (isTokenLoading && !tokenPayload) ||
    (isTokenFetching && !tokenPayload)
  ) {
    content = (
      <UiCard className={styles.videoChatCard}>
        <div className={styles.centeredRow}>
          <Spin size="large" />
        </div>
        <div className={styles.actionsRow}>
          <UiButton
            type="default"
            onClick={() => refetchLessons()}
            loading={isLessonsFetching}
          >
            Обновить расписание
          </UiButton>
          {scheduleButton}
        </div>
        {lessonsList}
      </UiCard>
    );
  } else if (!tokenPayload?.token || !tokenPayload?.url) {
    content = (
      <UiCard className={styles.videoChatCard}>
        <UiTypography>
          Токен видеосвязи не найден. Обратитесь к администратору.
        </UiTypography>
        <div className={styles.actionsRow}>
          <UiButton onClick={() => refetchToken()} loading={isTokenFetching}>
            Повторить попытку
          </UiButton>
          <UiButton
            type="default"
            onClick={() => refetchLessons()}
            loading={isLessonsFetching}
          >
            Обновить расписание
          </UiButton>
          {scheduleButton}
        </div>
        {lessonsList}
      </UiCard>
    );
  } else {
    content = (
      <UiCard className={styles.videoChatCard}>
        <div className={styles.infoBlock}>
          <UiTypography>
            Идёт урок: {activeLesson ? formatRange(activeLesson) : 'сейчас'}
          </UiTypography>
          {activeLesson?.title && (
            <UiTypography type="label">{activeLesson.title}</UiTypography>
          )}
        </div>
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
        {lessonsList}
        <div className={styles.actionsRow}>
          <UiButton onClick={() => refetchToken()} loading={isTokenFetching}>
            Обновить токен
          </UiButton>
          <UiButton
            type="default"
            onClick={() => refetchLessons()}
            loading={isLessonsFetching}
          >
            Обновить расписание
          </UiButton>
          {scheduleButton}
        </div>
        <UiTypography size="small" type="label">
          Окно подключения открывается за {EARLY_JOIN_MINUTES} минут до начала и
          закрывается через {LATE_JOIN_MINUTES} минут после окончания.
        </UiTypography>
      </UiCard>
    );
  }

  return (
    <>
      {content}
      {canSchedule && (
        <CreateVideoLessonModal
          relationId={relationId}
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreated={() => refetchLessons()}
        />
      )}
    </>
  );
};
