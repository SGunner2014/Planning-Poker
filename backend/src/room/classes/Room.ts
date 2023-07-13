import { Socket } from 'socket.io';
import { RoomService } from '../room.service';

export class User {
  id: string;
  client: Socket;
  username: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);

    this.client.on('disconnect', () => {
      RoomService.handleUserDisconnect(this.id, this.client);
    });
  }
}

export enum RoomState {
  Lobby = 'lobby',
  Voting = 'voting',
  Reveal = 'reveal',
}

export class Room {
  id: string;
  users: User[];
  ownerId: string;
  state: RoomState;
  latestUserId: number;
  votes: Record<string, string | number>;
  usernameFromIdMap: Record<number, string>;

  constructor(partial: Partial<Room>) {
    Object.assign(this, partial);
    this.state = RoomState.Lobby;
  }
}
