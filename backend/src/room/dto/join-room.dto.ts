import { IsString } from 'class-validator';

export class JoinRoomDto {
  @IsString()
  username: string;

  @IsString()
  roomId: string;
}
