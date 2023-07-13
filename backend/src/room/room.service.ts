import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';
import { Room, RoomState, User } from './classes/Room';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { MessageTypes } from 'src/enums/MessageTypes';
import { Socket } from 'socket.io';
import { StartVotingDto } from './dto/start-voting.dto';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
  private static rooms: Record<string, Room> = {};
  private static userToRoomMap: Record<string, string> = {};
  private static clientIdToUserIdMap: Record<string, string> = {};

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
      users: [new User({ id: userId, username, client })],
    });

    RoomService.rooms[roomId] = newRoom;
    RoomService.userToRoomMap[userId] = roomId;
    RoomService.clientIdToUserIdMap[client.id] = userId;

    return [newRoom, userId];
  }

  /**
   * Joins a room
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
    RoomService.clientIdToUserIdMap[client.id] = userId;

    return [room, userId];
  }

  public startVoting(startVotingDto: StartVotingDto, userId: string) {
    const room = RoomService.rooms[startVotingDto.roomId];

    if (!room) {
      throw new Error('Room not found');
    }

    if (room.ownerId !== userId) {
      throw new Error('Only the room owner can start voting');
    }

    room.state = RoomState.Voting;
    room.votes = {};

    RoomService.broadcast(room.id, MessageTypes.VOTING_STARTED, {
      room: RoomDto.fromRoom(room),
    });
  }

  public registerVote(point: number | string, userId: string) {
    const roomId = RoomService.userToRoomMap[userId];

    if (!roomId) {
      throw new Error('Room not found');
    }

    const room = RoomService.rooms[roomId];

    if (!room) {
      throw new Error('Room not found');
    }

    if (room.state !== RoomState.Voting) {
      throw new Error('Voting not started');
    }

    room.votes[userId] = point;

    RoomService.broadcast(room.id, MessageTypes.USER_VOTED, {
      room: RoomDto.fromRoom(room).omit('votes'),
      userId,
    });
  }

  public revealCards(roomId: string, userId: string) {
    const room = RoomService.rooms[roomId];

    if (!room) {
      throw new Error('Room not found');
    }

    if (room.ownerId !== userId) {
      throw new Error('Only the room owner can reveal cards');
    }

    if (room.state !== RoomState.Voting) {
      throw new Error('Voting not started');
    }

    room.state = RoomState.Reveal;

    RoomService.broadcast(room.id, MessageTypes.CARDS_REVEALED, {
      room: RoomDto.fromRoom(room),
    });
  }

  /**
   * Returns the associated user id for a given socket
   */
  public static getClientIdFromSocket(client: Socket): string {
    return RoomService.clientIdToUserIdMap[client.id];
  }

  /**
   * Invoked on user disconnect, cleans up related resources
   */
  public static handleUserDisconnect(userId: string, client: Socket) {
    const roomId = RoomService.userToRoomMap[userId];

    if (!roomId) {
      throw new Error('Room not found');
    }

    RoomService.rooms[roomId].users = RoomService.rooms[roomId].users.filter(
      (user) => user.id !== userId,
    );

    if (RoomService.rooms[roomId].users.length === 0) {
      delete RoomService.rooms[roomId];
      return;
    }

    if (RoomService.rooms[roomId].ownerId === userId) {
      RoomService.rooms[roomId].ownerId = RoomService.rooms[roomId].users[0].id;
    }

    RoomService.broadcast(roomId, MessageTypes.USER_LEFT, {
      userId,
      ownerId: RoomService.rooms[roomId].ownerId,
    });

    delete RoomService.userToRoomMap[userId];
    delete RoomService.clientIdToUserIdMap[client.id];
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
