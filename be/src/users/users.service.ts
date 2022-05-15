import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email: email },
    });
    delete user.password;
    delete user.refreshToken;
    return user;
  }

  async get(searchStr: string, skip: number, take: number) {
    return {
      records: await this.prisma.user.findMany({
        where: { username: { contains: searchStr } },
        orderBy: { role: 'asc' },
        select: {
          email: true,
          username: true,
          id: true,
          role: true,
          _count: { select: { pictures: true } },
        },
        skip,
        take,
      }),
      count: await this.prisma.user.count({
        where: { username: { contains: searchStr } },
      }),
    };
  }

  async find(searchStr: string, take: number) {
    return await this.prisma.user.findMany({
      where: { username: { contains: searchStr } },
      select: { email: true, username: true, id: true },
      take,
    });
  }
}
