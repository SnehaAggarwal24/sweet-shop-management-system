import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('sweets')
export class SweetsController {
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createSweet() {
    return { message: 'Sweet created' };
  }
}
