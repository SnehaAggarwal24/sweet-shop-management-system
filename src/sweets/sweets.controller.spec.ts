import { Test, TestingModule } from '@nestjs/testing';
import { SweetsController } from './sweets.controller';

describe('SweetsController', () => {
  let controller: SweetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SweetsController],
    }).compile();

    controller = module.get<SweetsController>(SweetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
