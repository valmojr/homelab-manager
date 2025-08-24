import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly baseUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

  async sendMessage(chatId: string, message: string, parseMode: 'Markdown' | 'MarkdownV2' | 'HTML' = 'Markdown') {
    try {
      await fetch(`${this.baseUrl}/sendMessage`, {
        method: "POST",
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: parseMode,
        })
      });
    } catch (err) {
      this.logger.error('Failed to send Telegram message', err);
    }
  }
}
