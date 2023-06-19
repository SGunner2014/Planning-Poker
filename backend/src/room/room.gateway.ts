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

@WebSocketGateway()
export class RoomGateway {
  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage(MessageTypes.JOIN_ROOM)
  handleJoinRoom(
    @MessageBody() joinRoomDto: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    return this.roomService.joinRoom(joinRoomDto, client);
  }

  @SubscribeMessage(MessageTypes.CREATE_ROOM)
  handleCreateRoom(
    @MessageBody() createRoomDto: CreateRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    return this.roomService.createRoom(createRoomDto, client);
  }
}
