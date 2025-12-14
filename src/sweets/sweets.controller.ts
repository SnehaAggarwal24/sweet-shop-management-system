import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SweetsService } from './sweets.service';
import { CreateSweetDto } from './dto/create-sweet.dto';
import { HttpCode } from '@nestjs/common';

@Controller('sweets')
export class SweetsController {
  constructor(private readonly sweetsService: SweetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createSweet(@Body() dto: CreateSweetDto) {
    return this.sweetsService.create(dto);
  }

  @Get()
  async getAllSweets() {
    return this.sweetsService.findAll();
  }
  @Get('search')
async searchSweets(
  @Query('name') name?: string,
  @Query('category') category?: string,
  @Query('minPrice') minPrice?: string,
  @Query('maxPrice') maxPrice?: string,
) {
  return this.sweetsService.search({
    name,
    category,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });
}
@UseGuards(AuthGuard('jwt'))
@Post(':id/purchase')
@HttpCode(200)
async purchaseSweet(@Param('id') id: string) {
  return this.sweetsService.purchase(Number(id));
}



}
