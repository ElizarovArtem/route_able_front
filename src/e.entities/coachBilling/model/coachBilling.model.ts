import { CoachOrderStatus } from '@/e.entities/coachBilling/model/coachBilling.constants.ts';

export type CoachOffer = {
  id: string;
  coachId: string;
  title: string;
  description: string;
  type: string;
  sessionCount: number;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: string;
  clientId: string;
  coachId: string;
  offerId: string;
  status: CoachOrderStatus;
};
