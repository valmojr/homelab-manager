import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { TelegramService } from "./telegram/telegram.service";
import { ReportService } from "./report/report.service";

@Injectable()
export class TasksService {
  constructor(private readonly telegramService: TelegramService, private readonly reportService: ReportService) {
    process.env.NODE_ENV !== 'production' && this.sendReport();
  }

  @Cron('0 7 * * *')
  async sendReport() {
    const report = await this.reportService.generateReport();
    return await this.telegramService.sendMessage(process.env.TELEGRAM_CHAT_ID || "", report);
  }
}