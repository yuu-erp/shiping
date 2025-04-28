import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prismaService/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  getAllUser() {
    return this.prismaService.user.findMany();
  }

  getUser(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: { id: true, email: true, createdAt: true }, // Chỉ lấy trường cần thiết
    });
  }

  updateUser({
    id,
    email,
    password,
  }: {
    email?: string;
    password?: string;
    id: number;
  }) {
    return this.prismaService.user.update({
      where: { id },
      data: { email, password },
    });
  }

  createUser({ email, password }: { email: string; password: string }) {
    return this.prismaService.user.create({ data: { email, password } });
  }

  async getUserById(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, createdAt: true }, // Chỉ lấy trường cần thiết
    });

    return user;
  }
}
