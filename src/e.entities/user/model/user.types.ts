import {
  ActivityLevel,
  Gender,
  Roles,
  WeightGoal,
} from '@/e.entities/user/model/user.enums.ts';

export type User = {
  name?: string;
  email: string;
  about?: string;
  phone?: string;
  roles: Roles;
  isCoach: boolean;
  avatar?: string;
  id: string;
  height?: number;
  weight?: number;
  activityLevel: ActivityLevel;
  weightGoal: WeightGoal;
  gender: Gender;
  birthDate: string;
  bodyFatPercent?: number;
  isCoachAgreed?: boolean;
};

export type Relation = {
  id: string;
  clientId: string;
  coachId: string;
  createdAt: string;
  isActive: boolean;
  activatedAt: string;
  deactivatedAt: string | null;
  goalCalories: number;
  goalProtein: number;
  goalFat: number;
  goalCarbs: number;
};

export type ClientCoachRelationDto = {
  id: string;
  clientId: string;
  coachId: string;
  createdAt: string;
  isActive: boolean;
  activatedAt?: string | null;
  deactivatedAt?: string | null;
  goalCalories?: number | null;
  goalProtein?: number | null;
  goalFat?: number | null;
  goalCarbs?: number | null;
};
