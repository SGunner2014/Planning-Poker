import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';
import { Room, User } from './classes/Room';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { MessageTypes } from 'src/enums/MessageTypes';
import { Socket } from 'socket.io';

@Injectable()
export class RoomService {
  private static rooms: Record<string, Room> = {};
  private static userToRoomMap: Record<string, string> = {};

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
      users: [new User({ id: this.generateId(), username, client })],
    });

    RoomService.rooms[roomId] = newRoom;
    RoomService.userToRoomMap[userId] = roomId;

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

    room.users.push(new User({ id: userId, username, client }));
    room.latestUserId += 1;
    room.usernameFromIdMap[room.latestUserId] = username;
    RoomService.userToRoomMap[userId] = roomId;

    return [room, userId];
  }

  public static handleUserDisconnect(userId: string) {
    const roomId = RoomService.userToRoomMap[userId];

    console.log('user id: ' + userId);
    console.log(RoomService.userToRoomMap);

    if (!roomId) {
      throw new Error('Room not found');
    }

    RoomService.rooms[roomId].users = RoomService.rooms[roomId].users.filter(
      (user) => user.id !== userId,
    );

    if (RoomService.rooms[roomId].users.length === 0) {
      delete RoomService.rooms[roomId];
      console.log('deleting room');
      return;
    }

    if (RoomService.rooms[roomId].ownerId === userId) {
      RoomService.rooms[roomId].ownerId = RoomService.rooms[roomId].users[0].id;
    }

    RoomService.broadcast(roomId, MessageTypes.USER_LEFT, {
      userId,
      ownerId: RoomService.rooms[roomId].ownerId,
    });
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
}
