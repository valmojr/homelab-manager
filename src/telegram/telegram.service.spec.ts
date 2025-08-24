import { Test, TestingModule } from '@nestjs/testing';
import { TelegramService } from './telegram.service';

describe('TelegramService', () => {
  let service: TelegramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramService],
    }).compile();

    service = module.get<TelegramService>(TelegramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMessage', () => {
    const chatId = '123456';
    const message = 'Hello, world!';
    const parseMode = 'Markdown';

    let fetchMock: jest.SpyInstance;

    beforeEach(() => {
      fetchMock = jest.spyOn(global, 'fetch' as any);
      jest.spyOn(service['logger'], 'log').mockImplementation(() => {});
      jest.spyOn(service['logger'], 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      fetchMock.mockRestore();
      jest.restoreAllMocks();
    });

    it('should send a message successfully', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      } as any);

      await service.sendMessage(chatId, message, parseMode);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/sendMessage'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: parseMode,
          }),
        }),
      );
      expect(service['logger'].log).toHaveBeenCalledWith(`Sending message to chat ${chatId}`);
    });

    it('should log and throw error if response is not ok', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        statusText: 'Bad Request',
        json: async () => ({ ok: false, description: 'Some error' }),
      } as any);

      await service.sendMessage(chatId, message, parseMode);

      expect(service['logger'].error).toHaveBeenCalledWith(
        'Failed to send message: Some error'
      );
    });

    it('should log error if fetch throws', async () => {
      fetchMock.mockRejectedValue(new Error('Network error'));

      await service.sendMessage(chatId, message, parseMode);

      expect(service['logger'].error).toHaveBeenCalledWith(
        'Failed to send Telegram message',
        expect.any(Error)
      );
    });
  });
});
