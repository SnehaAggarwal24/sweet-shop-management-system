import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateSweetDto } from './dto/create-sweet.dto';

@Injectable()
export class SweetsService {
  private prisma = new PrismaClient();

  async create(dto: CreateSweetDto) {
    return this.prisma.sweet.create({
      data: {
        name: dto.name,
        category: dto.category,
        price: dto.price,
        quantity: dto.quantity,
      },
    }
  );
  
  }
  async findAll() {
  return this.prisma.sweet.findMany();
}

}
