import { Socket } from 'socket.io';

export class User {
  id: string;
  client: Socket;
  username: string;
}

export class Room {
  id: string;
  users: User[];
  ownerId: string;
  latestUserId: number;
  usernameFromIdMap: Record<number, string>;

  constructor(partial: Partial<Room>) {
    Object.assign(this, partial);
  }
}
