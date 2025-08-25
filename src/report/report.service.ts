import { Injectable } from '@nestjs/common';
import { NetworkService } from 'src/network/network.service';
import { SystemService } from 'src/system/system.service';
import { WeatherService } from 'src/weather/weather.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly systemService: SystemService,
    private readonly networkService: NetworkService,
    private readonly weatherService: WeatherService,
  ) {}

  private async generateSystemReport() {
    return this.systemService.generateReport();
  }

  private async generateNetworkReport() {
    return this.networkService.generateReport();
  }

  private async generateWeatherReport() {
    return this.weatherService.generateReport();
  }

  private async generateFinancialReport() {
    return 'Financial report not implemented yet.';
  }

  async generateReport() {
    const sections = [
      "*Homelab Manager Daily Report*",
      "",
      await this.generateSystemReport(),
      await this.generateNetworkReport(),
      await this.generateWeatherReport(),
      await this.generateFinancialReport(),
    ];
    return sections.join('\n');
  }
}
