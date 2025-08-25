import { Injectable, Logger } from '@nestjs/common';
import { getWeatherEmoji } from 'src/utils/converters';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly apiKey = process.env.OPENWEATHER_API_KEY;
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

  async getCurrentWeather(city: string = process.env.OPENWEATHER_CITY || 'São Paulo') {
    try {
      const url = `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric&lang=pt_br`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`OpenWeather API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json() as any;

      return {
        city: data.name,
        temp: data.main.temp.toFixed(1),
        feelsLike: data.main.feels_like.toFixed(1),
        desc: `${getWeatherEmoji(data.weather[0].icon)} ${data.weather[0].description}`,
        humidity: data.main.humidity,
      };
    } catch (err) {
      this.logger.error('Erro ao buscar clima', err);
    }
  }

  async generateReport() {
    const weather = await this.getCurrentWeather();

    if (weather) {
      return [
        `*Clima*`,
        `Cidade - ${weather.city}`,
        `Temperatura - ${weather.temp}°C`,
        `Sensação térmica: ${weather.feelsLike}°C`,
        `Condição - ${weather.desc}`,
        `Umidade - ${weather.humidity}%`,
      ].join('\n');
    } else {
      return [
        `*Weather*`,
        `Not available`,
      ].join('\n');
    }
  }
}
