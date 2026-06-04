import { useQuery } from '@tanstack/react-query';

import { type GetCoachOffersParams } from '@/e.entities/coachBilling/api/requests/get-coach-offers.request.ts';
import { getOrderStatus } from '@/e.entities/coachBilling/api/requests/get-order-status.request.ts';
import { CoachOrderStatus } from '@/e.entities/coachBilling/model/coachBilling.constants.ts';
import type { Order } from '@/e.entities/coachBilling/model/coachBilling.model.ts';

export const useGetOrderStatus = (
  orderId: GetCoachOffersParams['coachId'] | null,
) => {
  return useQuery<Order>({
    queryKey: ['coach-order', orderId],
    queryFn: () => getOrderStatus({ orderId: orderId as string }),
    enabled: Boolean(orderId),
    refetchInterval: (query) => {
      const status = query.state.data?.status;

      if (!status) return 2000;

      if (
        status === CoachOrderStatus.PAID ||
        status === CoachOrderStatus.FAILED
      ) {
        return false;
      }

      return 2000;
    },

    refetchIntervalInBackground: false,
  });
};
