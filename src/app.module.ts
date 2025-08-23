import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule } from './discord/discord.module';
import { TelegramModule } from './telegram/telegram.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [DiscordModule, TelegramModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
