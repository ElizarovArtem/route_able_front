import React from 'react';

import { AddWorkoutExercise } from '@/d.features/workouts';
import { Roles } from '@/e.entities/user';
import { PlannedWorkoutsList } from '@/e.entities/workout';

import style from './WorkoutPlanFromCoach.module.scss';

type WorkoutPlanFromCoachProps = {
  relationId?: string;
  meRole?: Roles;
};

export const WorkoutPlanFromCoach = ({
  relationId,
  meRole,
}: WorkoutPlanFromCoachProps) => {
  return (
    <div className={style.wrapper}>
      <AddWorkoutExercise relationId={relationId} />

      <PlannedWorkoutsList relationId={relationId} meRole={meRole} />
    </div>
  );
};
