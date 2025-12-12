import { api } from '@/f.shared/api';

export type DeleteTimeSlotRequest = {
  slotId: string;
};

export const deleteTimeSlot = async ({
  slotId,
}: DeleteTimeSlotRequest): Promise<void> => {
  await api.delete(`/coach/slots/${slotId}`);
};
