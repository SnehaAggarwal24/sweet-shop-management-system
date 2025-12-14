import { Module } from '@nestjs/common';
import { SweetsController } from './sweets.controller';
import { SweetsService } from './sweets.service';

@Module({
  controllers: [SweetsController],
  providers: [SweetsService]
})
export class SweetsModule {}
