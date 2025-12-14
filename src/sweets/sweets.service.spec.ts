import { Test, TestingModule } from '@nestjs/testing';
import { SweetsService } from './sweets.service';

describe('SweetsService', () => {
  let service: SweetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SweetsService],
    }).compile();

    service = module.get<SweetsService>(SweetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
