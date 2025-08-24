import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { WeatherModule } from './weather/weather.module';
import { ScheduleModule } from '@nestjs/schedule';
import TasksService from './tasks.service';

@Module({
  imports: [ ScheduleModule.forRoot(),
  TelegramModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService, TasksService],
})

export class AppModule {}
