import React, { useState } from 'react';

import { useLessons } from '@/e.entities/lessons/model/lessons.utils.ts';
import { PlannedVideoLesson } from '@/e.entities/lessons/ui/PlannedVideoLesson/PlannedVideoLesson.tsx';
import { Roles } from '@/e.entities/user';
import {
  UiCard,
  UiDatepicker,
  UiFlex,
  UiSectionHeader,
  UiTypography,
  VideoIcon,
} from '@/f.shared/ui';

type LessonsProps = {
  className?: string;
  forRole: Roles;
};

export const Lessons = ({ forRole, className }: LessonsProps) => {
  const [date, setDate] = useState(new Date());

  const { data } = useLessons(forRole, date);

  const items = data?.items || [];

  return (
    <UiCard className={className}>
      <UiSectionHeader
        icon={<VideoIcon size={18} />}
        title="Занятия"
        subtitle={items.length ? `На выбранную дату: ${items.length}` : 'На выбранную дату нет занятий'}
        action={
          <UiDatepicker
            defaultValue={date}
            minDate={new Date()}
            onChange={(d) => setDate(d as Date)}
          />
        }
      />

      <UiFlex direction="column" gap="xs">
        {items.length ? (
          items.map((lesson) => (
            <PlannedVideoLesson key={lesson.id} lesson={lesson} />
          ))
        ) : (
          <UiTypography type="label">Свободный день — выбери другую дату или забронируй занятие.</UiTypography>
        )}
      </UiFlex>
    </UiCard>
  );
};
