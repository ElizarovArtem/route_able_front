import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import React, { useState } from 'react';

import { CalculateTDEEModal } from '@/d.features/user/ui/CalculateTDEEModal/CalculateTDEEModal.tsx';
import { UpdateUserModal } from '@/d.features/user/ui/UpdateUserModal/UpdateUserModal.tsx';
import { UserInfoItem, userSelector } from '@/e.entities/user';
import {
  ActivityLevelMap,
  GenderMap,
  WeightGoalMap,
} from '@/e.entities/user/model/user.constants.tsx';
import { useSelector } from '@/f.shared/lib';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import { UiButton, UiCard, UiFlex, UiTypography } from '@/f.shared/ui';
import { UiAvatar } from '@/f.shared/ui/UiAvatar/UiAvatar.tsx';

export const UserInfo = () => {
  const { user } = useSelector(userSelector);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const [isTDEEModalOpen, setIsTDEEModalOpen] = useState(false);
  const isMobile = useMobile();

  return (
    <UiCard>
      <UiFlex direction="column" align="center" gap="s">
        <UiFlex justify="center">
          <UiAvatar src={user?.avatar} height="auto" />
        </UiFlex>
        <UiTypography bold>{user?.name}</UiTypography>
        <UiTypography type="label">
          {user?.isCoachAgreed ? 'Тренер' : 'Клиент'}
        </UiTypography>
        <UiFlex direction="column" gap="xs">
          <UiButton onClick={() => setIsUpdateUserModalOpen(true)}>
            Редактировать
          </UiButton>
          <UiButton onClick={() => setIsTDEEModalOpen(true)}>
            Рассчитать TDEE
          </UiButton>
        </UiFlex>
      </UiFlex>

      {/*<UiFlex*/}
      {/*  direction={isMobile ? 'column' : 'row'}*/}
      {/*  gap={isMobile ? 's' : 'm'}*/}
      {/*>*/}
      {/*  <UiFlex direction="column" flex={1}>*/}
      {/*    <UiFlex justify="center">*/}
      {/*      <UiAvatar src={user?.avatar} height={isMobile ? 200 : 'auto'} />*/}
      {/*    </UiFlex>*/}
      {/*    <UiFlex*/}
      {/*      direction={isMobile ? 'row' : 'column'}*/}
      {/*      childrenEqualLength={isMobile}*/}
      {/*      gap={isMobile ? 'm' : 's'}*/}
      {/*    >*/}
      {/*      <UiButton onClick={() => setIsUpdateUserModalOpen(true)}>*/}
      {/*        Обновить*/}
      {/*      </UiButton>*/}
      {/*      <UiButton onClick={() => setIsTDEEModalOpen(true)}>*/}
      {/*        Расчитать TDEE*/}
      {/*      </UiButton>*/}
      {/*    </UiFlex>*/}
      {/*  </UiFlex>*/}

      {/*  <UiFlex direction="column" flex={isMobile ? 4 : 3}>*/}
      {/*    <UiFlex direction="column" gap={isMobile ? 's' : 'm'}>*/}
      {/*      <UiFlex direction="column" gap="xs">*/}
      {/*        <UiTypography bold>Профиль</UiTypography>*/}
      {/*        <UiFlex*/}
      {/*          wrap="wrap"*/}
      {/*          gap={isMobile ? 's' : 'm'}*/}
      {/*          align={isMobile ? 'start' : 'end'}*/}
      {/*        >*/}
      {/*          <UserInfoItem title="Имя" value={user?.name || ''} />*/}
      {/*          <UserInfoItem title="Рост, см" value={user?.height || ''} />*/}
      {/*          <UserInfoItem title="Вес, кг" value={user?.weight || ''} />*/}
      {/*          <UserInfoItem*/}
      {/*            title="Дата рождения"*/}
      {/*            value={*/}
      {/*              user?.birthDate*/}
      {/*                ? format(user.birthDate || '', 'dd MMMM yyyy', {*/}
      {/*                    locale: ru,*/}
      {/*                  })*/}
      {/*                : ''*/}
      {/*            }*/}
      {/*          />*/}
      {/*          <UserInfoItem*/}
      {/*            title="Пол"*/}
      {/*            value={user ? GenderMap[user.gender] : ''}*/}
      {/*          />*/}
      {/*          <UserInfoItem title="О себе" value={user?.about || ''} />*/}
      {/*        </UiFlex>*/}
      {/*      </UiFlex>*/}

      {/*      <UiFlex direction="column" gap="xs">*/}
      {/*        <UiTypography bold>Тренировочная информация</UiTypography>*/}
      {/*        <UiFlex*/}
      {/*          wrap="wrap"*/}
      {/*          gap={isMobile ? 's' : 'm'}*/}
      {/*          align={isMobile ? 'start' : 'end'}*/}
      {/*        >*/}
      {/*          <UserInfoItem*/}
      {/*            title="Цель"*/}
      {/*            value={user ? WeightGoalMap[user.weightGoal] : ''}*/}
      {/*          />*/}
      {/*          <UserInfoItem*/}
      {/*            title="Уровень активности"*/}
      {/*            value={user ? ActivityLevelMap[user.activityLevel] : ''}*/}
      {/*          />*/}
      {/*        </UiFlex>*/}
      {/*      </UiFlex>*/}
      {/*    </UiFlex>*/}

      {/*    <UiFlex direction="column" gap="xs">*/}
      {/*      <UiTypography bold>Контактные данные</UiTypography>*/}
      {/*      <UiFlex gap={isMobile ? 's' : 'm'} wrap="wrap">*/}
      {/*        <UserInfoItem title="Номер телефона" value={user?.phone || ''} />*/}
      {/*        <UserInfoItem*/}
      {/*          title="Электронная почта"*/}
      {/*          value={user?.email || ''}*/}
      {/*        />*/}
      {/*      </UiFlex>*/}
      {/*    </UiFlex>*/}
      {/*  </UiFlex>*/}
      {/*</UiFlex>*/}

      <UpdateUserModal
        setOpenModal={setIsUpdateUserModalOpen}
        open={isUpdateUserModalOpen}
        onCancel={() => setIsUpdateUserModalOpen(false)}
      />
      <CalculateTDEEModal
        open={isTDEEModalOpen}
        onCancel={() => setIsTDEEModalOpen(false)}
        onClose={() => setIsTDEEModalOpen(false)}
      />
    </UiCard>
  );
};
