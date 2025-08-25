import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { SystemModule } from 'src/system/system.module';
import { NetworkModule } from 'src/network/network.module';
import { WeatherModule } from 'src/weather/weather.module';

@Module({
  imports: [SystemModule, NetworkModule, WeatherModule],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
