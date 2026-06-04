import type { Socket } from 'socket.io-client';

type SendMessageWsRequest = {
  socket: Socket;
  chatId: string;
  text: string;
};

export const sendMessageWs = ({
  socket,
  chatId,
  text,
}: SendMessageWsRequest) => {
  return new Promise((resolve, reject) => {
    socket.emit('send_message', { chatId, text }, (ack: any) => {
      if (!ack?.ok) {
        return reject(ack);
      }

      resolve(ack.message);
    });
  });
};
