import { Room, User } from '../classes/Room';

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

  constructor(partial: Partial<RoomDto>) {
    Object.assign(this, partial);
  }

  static fromRoom(room: Room) {
    return new RoomDto({
      id: room.id,
      users: room.users.map((user) => UserDto.fromUser(user)),
      ownerId: room.ownerId,
    });
  }
}
