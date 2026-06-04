import { io, type Socket } from 'socket.io-client';

import { config } from '@/f.shared/config';

let socket: Socket | null = null;

export function connectSocket() {
  if (!socket) {
    socket = io(`${config.API_SOCKET_URL}/chats`, {
      transports: ['websocket'],
      withCredentials: true,
    });
  }
  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
