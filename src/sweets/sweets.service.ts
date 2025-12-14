import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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
    });
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

async purchase(id: number) {
  const sweet = await this.prisma.sweet.findUnique({
    where: { id },
  });

  if (!sweet) {
    throw new NotFoundException('Sweet not found');
  }

  if (sweet.quantity <= 0) {
    throw new BadRequestException('Sweet out of stock');
  }

  return this.prisma.sweet.update({
    where: { id },
    data: {
      quantity: sweet.quantity - 1,
    },
  });
}



 
}
