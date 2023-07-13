import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { MessageTypes } from "src/enums/MessageTypes";
import { JoinRoomDto } from "./dto/join-room.dto";
import { RoomService } from "./room.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { Socket } from "socket.io";
import { RoomDto } from "./dto/room.dto";

@WebSocketGateway({ cors: true })
export class RoomGateway {
  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage(MessageTypes.JOIN_ROOM)
  handleJoinRoom(
    @MessageBody() joinRoomDto: JoinRoomDto,
    @ConnectedSocket() client: Socket
  ) {
    const [room, userId] = this.roomService.joinRoom(joinRoomDto, client);
    RoomService.broadcast(
      room.id,
      MessageTypes.USER_JOINED,
      {
        username: joinRoomDto.username,
        userId: userId,
      },
      [userId]
    );

    return {
      room: RoomDto.fromRoom(room),
      userId,
    };
  }

  @SubscribeMessage(MessageTypes.CREATE_ROOM)
  handleCreateRoom(
    @MessageBody() createRoomDto: CreateRoomDto,
    @ConnectedSocket() client: Socket
  ) {
    const [room, userId] = this.roomService.createRoom(createRoomDto, client);

    return {
      room: RoomDto.fromRoom(room),
      userId,
    };
  }
}
