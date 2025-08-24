import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('HomeLab Manager API is running');
    });
  });
  describe('constructor', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });

    it('should have appService injected', () => {
      const controller: any = appController;
      expect(controller.appService).toBeInstanceOf(AppService);
    });
  });
});
