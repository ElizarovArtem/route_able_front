import React, { useState } from 'react';

import { useLessons } from '@/e.entities/lessons/model/lessons.utils.ts';
import { PlannedVideoLesson } from '@/e.entities/lessons/ui/PlannedVideoLesson/PlannedVideoLesson.tsx';
import { Roles } from '@/e.entities/user';
import { UiCard, UiDatepicker, UiFlex, UiTypography } from '@/f.shared/ui';

type LessonsProps = {
  className?: string;
  forRole: Roles;
};

export const Lessons = ({ forRole, className }: LessonsProps) => {
  const [date, setDate] = useState(new Date());

  const { data } = useLessons(forRole, date);
  console.log(data);
  return (
    <UiCard className={className}>
      <UiFlex direction="column">
        <UiFlex align="center">
          <UiTypography bold>Занятия на:</UiTypography>
          <UiDatepicker
            defaultValue={date}
            minDate={new Date()}
            onChange={(date) => setDate(date as Date)}
          />
        </UiFlex>

        <UiFlex direction="column" gap="xs">
          {(data?.items || []).map((lesson) => (
            <PlannedVideoLesson key={lesson.id} lesson={lesson} />
          ))}
        </UiFlex>
      </UiFlex>
    </UiCard>
  );
};
