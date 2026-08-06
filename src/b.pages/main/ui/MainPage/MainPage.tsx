import { useRouter } from '@tanstack/react-router';
import React from 'react';

import { CoachesList } from '@/c.widgets/user';
import { authSelector } from '@/d.features/user';
import { userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import {
  UiBanner,
  UiButton,
  UiCard,
  UiFlex,
  UiTitle,
  UiTypography,
} from '@/f.shared/ui';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  const { setIsAuthModalOpen } = useSelector(authSelector);
  const { user } = useSelector(userSelector);

  const router = useRouter();
  const isMobile = useMobile();

  const onAiAssistantClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      router.navigate({ to: '/ai-lesson' });
    }
  };

  return (
    <div className={styles.page}>
      <UiFlex direction="column">
        <UiBanner
          preview={false}
          src="/i_am_coach_banner.png"
          onClick={() => setIsAuthModalOpen(true)}
        />

        <UiFlex direction={isMobile ? 'column' : 'row'} align="start">
          <UiCard className={styles.aiAssistantBlock}>
            <UiFlex direction="column">
              <UiTitle size="xl">Тренировка с ИИ-ассистентом</UiTitle>
              <UiTypography type="label">
                Попробуйте тренировку с ИИ-ассистентом, который
                <br /> доступен 24 / 7
              </UiTypography>
              <UiFlex>
                <UiButton onClick={onAiAssistantClick}>Начать сессию</UiButton>
              </UiFlex>
            </UiFlex>
          </UiCard>
          <CoachesList />
        </UiFlex>
      </UiFlex>
    </div>
  );
};
