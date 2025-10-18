import '@livekit/components-styles';

import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { Spin } from 'antd';
import React from 'react';

import { useGetVideoToken } from '@/e.entities/user/api';
import { UiButton, UiCard, UiTypography } from '@/f.shared/ui';

import styles from './VideoChat.module.scss';

type VideoChatProps = {
  relationId?: string;
};

export const VideoChat = ({ relationId }: VideoChatProps) => {
  const { data, isLoading, isError, refetch, isFetching } =
    useGetVideoToken(relationId);

  if (!relationId) {
    return (
      <UiCard className={styles.videoChatCard}>
        <UiTypography>
          Видеосвязь доступна только для активного подключения с клиентом.
        </UiTypography>
      </UiCard>
    );
  }

  if (isLoading && !data) {
    return (
      <UiCard className={styles.videoChatCard}>
        <div className={styles.centeredRow}>
          <Spin size="large" />
        </div>
      </UiCard>
    );
  }

  if (isError) {
    return (
      <UiCard className={styles.videoChatCard}>
        <UiTypography>
          Не удалось получить данные для видеозвонка. Попробуйте обновить
          страницу или запросить доступ позже.
        </UiTypography>
        <UiButton onClick={() => refetch()} loading={isFetching}>
          Повторить попытку
        </UiButton>
      </UiCard>
    );
  }

  if (!data?.token || !data?.url) {
    return (
      <UiCard className={styles.videoChatCard}>
        <UiTypography>
          Токен видеосвязи не найден. Обратитесь к администратору.
        </UiTypography>
      </UiCard>
    );
  }

  return (
    <UiCard className={styles.videoChatCard}>
      <div className={styles.videoContainer}>
        <LiveKitRoom
          video
          audio
          token={data.token}
          serverUrl={data.url}
          connect
        >
          <VideoConference />
        </LiveKitRoom>
      </div>
    </UiCard>
  );
};
