import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { TelegramService } from "./telegram/telegram.service";

@Injectable()
export class TasksService {
  constructor(private readonly telegramService: TelegramService) {
    this.sendReport();
  }

  async sendReport() {
    return await this.telegramService.sendMessage(process.env.TELEGRAM_CHAT_ID || "", "This is a periodic report message.");
  }
}