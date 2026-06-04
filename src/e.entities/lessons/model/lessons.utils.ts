import { useGetCoachLessons } from '@/e.entities/lessons';
import { useGetClientLessons } from '@/e.entities/lessons/api/queries/useGetClientLessons.ts';
import { Roles } from '@/e.entities/user';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';

export const useLessons = (forRole: Roles, date: Date) => {
  if (forRole === Roles.Client) {
    return useGetClientLessons(formatDateForServer(date));
  } else {
    return useGetCoachLessons(formatDateForServer(date));
  }
};
