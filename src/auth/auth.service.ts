import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  async register(dto: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
        },
      });
      

      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }
  async login(dto: { email: string; password: string }) {
  const user = await this.prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (!user) {
    throw new ConflictException('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(
    dto.password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new ConflictException('Invalid credentials');
  }

  return {
    message: 'Login successful',
  };
}

}
