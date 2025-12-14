import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SweetsService } from './sweets.service';
import { CreateSweetDto } from './dto/create-sweet.dto';

@Controller('sweets')
export class SweetsController {
  constructor(private readonly sweetsService: SweetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createSweet(@Body() dto: CreateSweetDto) {
    return this.sweetsService.create(dto);
  }
}
