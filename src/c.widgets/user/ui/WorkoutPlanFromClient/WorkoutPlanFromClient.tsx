import React from 'react';

import { Roles } from '@/e.entities/user';
import { PlannedWorkoutsList } from '@/e.entities/workout';

import style from './WorkoutPlanFromClient.module.scss';

type WorkoutPlanFromClientProps = {
  relationId?: string;
  meRole?: Roles;
};

export const WorkoutPlanFromClient = ({
  relationId,
  meRole,
}: WorkoutPlanFromClientProps) => {
  return (
    <div className={style.wrapper}>
      <PlannedWorkoutsList relationId={relationId} meRole={meRole} />
    </div>
  );
};
