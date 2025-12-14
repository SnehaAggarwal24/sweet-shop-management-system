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
async search(query: {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  return this.prisma.sweet.findMany({
    where: {
      name: query.name
        ? { contains: query.name }
        : undefined,

      category: query.category
        ? { contains: query.category }
        : undefined,

      price: {
        gte: query.minPrice,
        lte: query.maxPrice,
      },
    },
  });
}

}
