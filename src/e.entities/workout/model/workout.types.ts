export type TGetWorkoutExercisesRequest = {
  relationId?: string;
  date: string;
};

export type TGetWorkoutExercisesResponse = {
  authorId: string;
  clientCoachId: string;
  clientId: string;
  coachId: string;
  createdAt: string;
  date: string;
  id: string;
  name: string;
  notes: null;
  order: number;
  reps: number;
  sets: number;
  completed: boolean;
  updatedAt: string;
  workingWeight: number;
}[];
