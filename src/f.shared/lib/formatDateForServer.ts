import { format } from 'date-fns';

export const formatDateForServer = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};
