import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessageTypes } from 'src/enums/MessageTypes';
import { JoinRoomDto } from './dto/join-room.dto';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Socket } from 'socket.io';
import { RoomDto } from './dto/room.dto';
import { StartVotingDto } from './dto/start-voting.dto';
import { SendVoteDto } from './dto/send-vote.dto';
import { RevealCardsDto } from './dto/reveal-cards.dto';

@WebSocketGateway({ cors: true })
export class RoomGateway {
  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage(MessageTypes.JOIN_ROOM)
  handleJoinRoom(
    @MessageBody() joinRoomDto: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    const [room, userId] = this.roomService.joinRoom(joinRoomDto, client);
    RoomService.broadcast(
      room.id,
      MessageTypes.USER_JOINED,
      {
        username: joinRoomDto.username,
        userId: userId,
      },
      [userId],
    );

    return {
      room: RoomDto.fromRoom(room),
      userId,
    };
  }

  @SubscribeMessage(MessageTypes.CREATE_ROOM)
  handleCreateRoom(
    @MessageBody() createRoomDto: CreateRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    const [room, userId] = this.roomService.createRoom(createRoomDto, client);

    return {
      room: RoomDto.fromRoom(room),
      userId,
    };
  }

  @SubscribeMessage(MessageTypes.START_VOTING)
  handleStartVoting(
    @MessageBody() startVotingDto: StartVotingDto,
    @ConnectedSocket() client: Socket,
  ): void {
    const clientId = RoomService.getClientIdFromSocket(client);

    if (!clientId) {
      throw new Error('Client ID not found');
    }

    this.roomService.startVoting(startVotingDto, clientId);
  }

  @SubscribeMessage(MessageTypes.VOTE)
  handleVote(
    @MessageBody() { point }: SendVoteDto,
    @ConnectedSocket() client: Socket,
  ): SendVoteDto {
    const clientId = RoomService.getClientIdFromSocket(client);

    if (!clientId) {
      throw new Error('Client ID not found');
    }

    this.roomService.registerVote(point, clientId);

    return {
      point,
    };
  }

  @SubscribeMessage(MessageTypes.REVEAL_CARDS)
  revealCards(
    @MessageBody() { roomId }: RevealCardsDto,
    @ConnectedSocket() client: Socket,
  ) {
    const clientId = RoomService.getClientIdFromSocket(client);

    if (!clientId) {
      throw new Error('Client ID not found');
    }

    this.roomService.revealCards(roomId, clientId);
  }
}
