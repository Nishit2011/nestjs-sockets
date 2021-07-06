import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
  providers: [ChatGateway, AppGateway],
})
export class AppModule {}
