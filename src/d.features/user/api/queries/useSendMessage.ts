import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { sendMessage, type SendMessageRequest } from '../requests';

export const useSendMessage = (
  mutationOptions?: MutationOptions<null, AxiosError, SendMessageRequest>,
) => {
  return useMutation<null, AxiosError, SendMessageRequest>({
    mutationFn: sendMessage,
    ...mutationOptions,
  });
};
