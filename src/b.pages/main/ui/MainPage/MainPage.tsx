import { useRouter } from '@tanstack/react-router';
import React, { useState } from 'react';

import { CoachesList } from '@/c.widgets/user';
import { authSelector } from '@/d.features/user';
import { SendCoachCooperationRequestModal } from '@/d.features/user/ui/SendCoachCooperationRequestModal/SendCoachCooperationRequestModal.tsx';
import { userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import { UiButton, UiCard, UiFlex, UiTitle, UiTypography } from '@/f.shared/ui';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  const [isCoachRequestModalOpen, setIsCoachRequestModalOpen] = useState(false);

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
        <UiCard>
          <UiButton onClick={() => setIsCoachRequestModalOpen(true)}>
            Я тренер, хочу сотрудничать
          </UiButton>
        </UiCard>
        <UiFlex direction={isMobile ? 'column' : 'row'} align="start">
          <UiCard className={styles.aiAssistantBlock}>
            <UiFlex direction="column">
              <UiTitle size="xl">Тренировка с ИИ-ассистентом</UiTitle>
              <UiTypography type="label">
                Попробуйте тренировку с ИИ-ассистентом, который доступен 24 / 7
              </UiTypography>
              <UiFlex>
                <UiButton onClick={onAiAssistantClick}>Начать сессию</UiButton>
              </UiFlex>
            </UiFlex>
          </UiCard>
          <CoachesList />
        </UiFlex>
      </UiFlex>

      <SendCoachCooperationRequestModal
        open={isCoachRequestModalOpen}
        onCancel={() => setIsCoachRequestModalOpen(false)}
      />
    </div>
  );
};
