import { Link, useRouterState } from '@tanstack/react-router';
import classNames from 'classnames';
import React, { useState } from 'react';

import { SendCoachCooperationRequestModal } from '@/d.features/user/ui/SendCoachCooperationRequestModal/SendCoachCooperationRequestModal.tsx';
import { feedbackSelector } from '@/e.entities/feedback/model/feedback.store.ts';
import {
  LkContentTypeTabKeys,
  Roles,
} from '@/e.entities/user/model/user.enums.ts';
import { userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import {
  CoachOfferIcon,
  DumbbellIcon,
  InfoIcon,
  SettingsIcon,
  TargetIcon,
  UiButton,
  UiFlex,
  UiTypography,
  UsersIcon,
} from '@/f.shared/ui';

import styles from './AppSidebar.module.scss';

type AppSidebarProps = {
  open: boolean;
  onClose: () => void;
};

type SidebarItemContentProps = {
  icon: React.ReactNode;
  label: string;
};

const SidebarItemContent = ({ icon, label }: SidebarItemContentProps) => (
  <UiFlex align="center" gap="s">
    <span className={styles.icon}>{icon}</span>
    <UiTypography>{label}</UiTypography>
  </UiFlex>
);

export const AppSidebar = ({ open, onClose }: AppSidebarProps) => {
  const [isCoachRequestModalOpen, setIsCoachRequestModalOpen] = useState(false);
  const { user } = useSelector(userSelector);
  const { setIsFeedbackModalOpen } = useSelector(feedbackSelector);
  const isCompact = useMobile(1024);

  const { pathname, tab } = useRouterState({
    select: (state) => ({
      pathname: state.location.pathname,
      tab: (state.location.search as { tab?: LkContentTypeTabKeys }).tab,
    }),
  });

  const isClientCabinetActive =
    pathname === '/lk' && (!tab || tab === LkContentTypeTabKeys.user);
  const isCoachCabinetActive =
    pathname === '/lk' && tab === LkContentTypeTabKeys.coach;
  const isAdminCabinetActive =
    pathname === '/lk' && tab === LkContentTypeTabKeys.admin;

  const isCoach = user?.roles.includes(Roles.Coach);
  const isAdmin = user?.roles.includes(Roles.Admin);
  const hasAdditionalRole = isCoach || isAdmin;
  const showCoachCooperation =
    Boolean(user) && !isCoach && !isAdmin && !user?.isCoachAgreed;

  const openFeedback = () => {
    setIsFeedbackModalOpen(true);
    onClose();
  };

  return (
    <>
      <button
        type="button"
        aria-label="Закрыть боковое меню"
        className={classNames(styles.backdrop, {
          [styles.backdropOpen]: open,
        })}
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <aside
        className={classNames(styles.sidebar, {
          [styles.sidebarOpen]: open,
        })}
        aria-label="Навигация личного кабинета"
        aria-hidden={isCompact && !open}
      >
        <UiFlex
          direction="column"
          justify="space-between"
          className={styles.inner}
        >
          <UiFlex direction="column" gap="m">
            <nav aria-label="Основная навигация">
              <UiFlex direction="column" gap="xxs">
                <Link
                  to="/lk"
                  search={{ tab: LkContentTypeTabKeys.user }}
                  className={classNames(styles.item, {
                    [styles.itemActive]: isClientCabinetActive,
                  })}
                  onClick={onClose}
                >
                  <SidebarItemContent
                    icon={<TargetIcon size={20} />}
                    label="Личный кабинет"
                  />
                </Link>

                <Link
                  to="/ai-lesson"
                  className={classNames(styles.item, {
                    [styles.itemActive]: pathname === '/ai-lesson',
                  })}
                  onClick={onClose}
                >
                  <SidebarItemContent
                    icon={<DumbbellIcon size={20} />}
                    label="ИИ-тренировки"
                  />
                </Link>

                <Link
                  to="/coaches"
                  className={classNames(styles.item, {
                    [styles.itemActive]:
                      pathname === '/coaches' || pathname.startsWith('/coach/'),
                  })}
                  onClick={onClose}
                >
                  <SidebarItemContent
                    icon={<UsersIcon size={20} />}
                    label="Тренеры"
                  />
                </Link>

                <Link
                  to="/subscriptions"
                  className={classNames(styles.item, {
                    [styles.itemActive]: pathname === '/subscriptions',
                  })}
                  onClick={onClose}
                >
                  <SidebarItemContent
                    icon={<CoachOfferIcon className={styles.offerIcon} />}
                    label="Тариф и подписка"
                  />
                </Link>
              </UiFlex>
            </nav>

            {hasAdditionalRole && (
              <UiFlex direction="column" gap="xs">
                <UiTypography
                  type="label"
                  size="small"
                  className={styles.sectionTitle}
                >
                  Режим работы
                </UiTypography>

                <UiFlex direction="column" gap="xxs">
                  {isCoach && (
                    <Link
                      to="/lk"
                      search={{ tab: LkContentTypeTabKeys.coach }}
                      className={classNames(styles.item, {
                        [styles.itemActive]: isCoachCabinetActive,
                      })}
                      onClick={onClose}
                    >
                      <SidebarItemContent
                        icon={<UsersIcon size={20} />}
                        label="Кабинет тренера"
                      />
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to="/lk"
                      search={{ tab: LkContentTypeTabKeys.admin }}
                      className={classNames(styles.item, {
                        [styles.itemActive]: isAdminCabinetActive,
                      })}
                      onClick={onClose}
                    >
                      <SidebarItemContent
                        icon={<SettingsIcon size={20} />}
                        label="Администрирование"
                      />
                    </Link>
                  )}
                </UiFlex>
              </UiFlex>
            )}
          </UiFlex>

          <UiFlex direction="column" gap="xs">
            {showCoachCooperation && (
              <UiFlex
                direction="column"
                gap="xs"
                className={styles.cooperation}
              >
                <UiFlex direction="column" gap="xxs">
                  <UiTypography bold>Я тренер — хочу сотрудничать</UiTypography>
                  <UiTypography type="label" size="small">
                    Станьте тренером на платформе Route•able.
                  </UiTypography>
                </UiFlex>
                <UiButton
                  block
                  size="middle"
                  onClick={() => {
                    setIsCoachRequestModalOpen(true);
                    onClose();
                  }}
                >
                  Оставить заявку
                </UiButton>
              </UiFlex>
            )}

            <UiFlex direction="column" gap="xs" className={styles.support}>
              <UiFlex direction="column" gap="xxs">
                <UiTypography bold>Нужна помощь?</UiTypography>
                <UiTypography type="label" size="small">
                  Напишите нам — поможем разобраться.
                </UiTypography>
              </UiFlex>
              <UiButton
                block
                size="middle"
                styleType="secondary"
                icon={<InfoIcon className={styles.infoIcon} />}
                onClick={openFeedback}
              >
                Обратная связь
              </UiButton>
            </UiFlex>
          </UiFlex>
        </UiFlex>
      </aside>

      <SendCoachCooperationRequestModal
        open={isCoachRequestModalOpen}
        onCancel={() => setIsCoachRequestModalOpen(false)}
        onClose={() => setIsCoachRequestModalOpen(false)}
      />
    </>
  );
};
