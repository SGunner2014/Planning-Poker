import { Socket } from 'socket.io';

export interface User {
  id: string;
  client: Socket;
  username: string;
}

export interface Room {
  id: string;
  users: User[];
  ownerId: string;
  latestUserId: number;
  usernameFromIdMap: Record<number, string>;
}
