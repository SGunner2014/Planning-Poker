import { Room, RoomState, User } from '../classes/Room';

export class UserDto {
  id: string;
  username: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }

  static fromUser(user: User) {
    return new UserDto({
      id: user.id,
      username: user.username,
    });
  }
}

export class RoomDto {
  id: string;
  users: UserDto[];
  ownerId: string;
  state: RoomState;
  votes: Record<string, string | number>;

  constructor(partial: Partial<RoomDto>) {
    Object.assign(this, partial);
  }

  omit(...keys: string[]) {
    const obj = { ...this };

    for (const key of keys) {
      delete obj[key];
    }

    return obj;
  }

  static fromRoom(room: Room) {
    return new RoomDto({
      id: room.id,
      users: room.users.map((user) => UserDto.fromUser(user)),
      ownerId: room.ownerId,
      state: room.state,
      votes: room.votes,
    });
  }
}
