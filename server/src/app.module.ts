import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WsGateway } from "./gateway/gateway";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [WsGateway],
})
export class AppModule {}
