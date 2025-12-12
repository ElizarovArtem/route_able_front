import React, { useState } from 'react';

import { useGetCoachVideoLessons } from '@/e.entities/lessons/api/queries/useGetCoachVideoLessons.ts';
import { PlannedVideoLesson } from '@/e.entities/lessons/ui/PlannedVideoLesson/PlannedVideoLesson.tsx';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import { UiCard, UiDatepicker, UiFlex, UiTypography } from '@/f.shared/ui';

export const Lessons = () => {
  const [date, setDate] = useState(new Date());

  const { data } = useGetCoachVideoLessons(formatDateForServer(date));

  return (
    <UiCard>
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
          {(data || []).map((lesson) => (
            <PlannedVideoLesson key={lesson.id} lesson={lesson} />
          ))}
        </UiFlex>
      </UiFlex>
    </UiCard>
  );
};
