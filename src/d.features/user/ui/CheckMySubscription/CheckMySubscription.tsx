import { useGetMyPlan } from '@/e.entities/subscriptions/api/queries/useGetMyPlan.ts';
import { userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';

export const CheckMySubscription = () => {
  const { user } = useSelector(userSelector);
  useGetMyPlan(user);

  return null;
};
