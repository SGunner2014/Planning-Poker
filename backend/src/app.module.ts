import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [DatabaseModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
