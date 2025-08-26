import { Injectable } from '@nestjs/common';
import { FinancialService } from '../financial/financial.service';
import { NetworkService } from '../network/network.service';
import { SystemService } from '../system/system.service';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly systemService: SystemService,
    private readonly networkService: NetworkService,
    private readonly weatherService: WeatherService,
    private readonly financialService: FinancialService,
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
    return this.financialService.generateReport();
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
