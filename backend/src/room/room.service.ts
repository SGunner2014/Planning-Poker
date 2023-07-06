import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';
import { Room } from './classes/Room';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { MessageTypes } from 'src/enums/MessageTypes';
import { Socket } from 'socket.io';

@Injectable()
export class RoomService {
  private static rooms: Record<string, Room> = {};

  /**
   * Creates a new room
   */
  public createRoom(
    { username }: CreateRoomDto,
    client: Socket,
  ): [Room, string] {
    const userId = this.generateId();
    const roomId = this.generateShortId();

    const newRoom = new Room({
      id: roomId,
      ownerId: userId,
      latestUserId: 0,
      usernameFromIdMap: {
        0: username,
      },
      users: [{ id: this.generateId(), username, client }],
    });

    RoomService.rooms[roomId] = newRoom;

    return [newRoom, userId];
  }

  /**
   * Joins a room
   *
   * @param param0
   */
  public joinRoom(
    { username, roomId }: JoinRoomDto,
    client: Socket,
  ): [Room, string] {
    const userId = this.generateId();

    const room = RoomService.rooms[roomId];

    if (!room) {
      console.log(RoomService.rooms);
      throw new Error('Room not found: ' + roomId);
    }

    room.users.push({ id: userId, username, client });
    room.latestUserId += 1;
    room.usernameFromIdMap[room.latestUserId] = username;

    return [room, userId];
  }

  /**
   * Broadcasts a message to all users in a room
   *
   * @param roomId
   * @param messageType
   * @param data
   * @param except
   */
  public static broadcast(
    roomId: string,
    messageType: MessageTypes,
    data: any,
    except?: string[],
  ) {
    const exceptIds = except || [];
    const room = RoomService.rooms[roomId];

    if (!room) {
      throw new Error('Room not found');
    }

    room.users
      .filter((user) => !exceptIds.includes(user.id))
      .forEach((user) => {
        user.client.emit(messageType, data);
      });
  }

  private generateShortId() {
    return (Math.random() + 1).toString(36).substring(7);
  }

  private generateId() {
    return uuid();
  }

  private static onClientDisconnect(
    client: Socket,
    roomId: string,
    userId: string,
  ) {
    const room = RoomService.rooms[roomId];

    if (!room) {
      throw new Error('Room not found');
    }

    const user = room.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    room.users = room.users.filter((user) => user.id !== userId);

    if (room.users.length === 0) {
      delete RoomService.rooms[roomId];
      return;
    }

    if (room.ownerId === userId) {
      room.ownerId = room.users[0].id;
    }

    RoomService.broadcast(
      roomId,
      MessageTypes.USER_LEFT,
      {
        userId,
        ownerId: room.ownerId,
      },
      [userId],
    );
  }
}
