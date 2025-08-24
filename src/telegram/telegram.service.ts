import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly baseUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

  async sendMessage(chatId: string, message: string, parseMode: 'Markdown' | 'MarkdownV2' | 'HTML' = 'Markdown') {
    try {
      this.logger.log(`Sending message to chat ${chatId}`);

      const body = JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: parseMode,
      });

      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        this.logger.error(`Failed to send message: ${data.description || response.statusText}`);
        throw new Error(data.description || 'Failed to send message');
      }
    } catch (err) {
      this.logger.error('Failed to send Telegram message', err);
    }
  }
}
