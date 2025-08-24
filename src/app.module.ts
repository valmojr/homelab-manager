import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { WeatherModule } from './weather/weather.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { ConfigModule } from '@nestjs/config';
import { SystemModule } from './system/system.module';
import { ReportModule } from './report/report.module';
import { NetworkModule } from './network/network.module';

@Module({
  imports: [ ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
  TelegramModule, WeatherModule, SystemModule, ReportModule, NetworkModule],
  controllers: [AppController],
  providers: [AppService, TasksService],
})

export class AppModule {}
