import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';
import { Room } from './classes/Room';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { MessageTypes } from 'src/enums/MessageTypes';
import { Socket } from 'socket.io';

@Injectable()
export class RoomService {
  private rooms: Record<string, Room> = {};

  /**
   * Creates a new room
   *
   * @param param0
   * @returns
   */
  public createRoom({ username }: CreateRoomDto, client: Socket) {
    const userId = this.generateId();
    const roomId = this.generateShortId();

    const newRoom: Room = {
      id: userId,
      ownerId: userId,
      latestUserId: 0,
      usernameFromIdMap: {
        0: username,
      },
      users: [{ id: this.generateId(), username, client }],
    };

    this.rooms[roomId] = newRoom;

    return roomId;
  }

  /**
   * Joins a room
   *
   * @param param0
   */
  public joinRoom({ username, roomId }: JoinRoomDto, client: Socket) {
    const userId = this.generateId();

    const room = this.rooms[roomId];

    if (!room) {
      throw new Error('Room not found');
    }

    room.users.push({ id: userId, username, client });
    room.latestUserId += 1;
    room.usernameFromIdMap[room.latestUserId] = username;

    return room;
  }

  /**
   * Broadcasts a message to all users in a room
   *
   * @param roomId
   * @param messageType
   * @param data
   * @param except
   */
  public broadcast(
    roomId: string,
    messageType: MessageTypes,
    data: any,
    except?: string[],
  ) {
    const exceptIds = except || [];
    const room = this.rooms[roomId];

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
