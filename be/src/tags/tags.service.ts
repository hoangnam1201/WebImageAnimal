import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async createTag(name: string) {
    return await this.prisma.tag.create({ data: { name, src: '' } });
  }

  async findTags(searchStr: string, take: number) {
    return await this.prisma.tag.findMany({
      where: { name: { contains: searchStr, mode: 'insensitive' } },
      take: take,
    });
  }

  async getTags(
    take: number,
    skip: number,
  ): Promise<{ records: any[]; count: number }> {
    return {
      records: await this.prisma.tag.findMany({
        take: take,
        skip: skip,
        include: { _count: { select: { pictures: true } } },
      }),
      count: await this.prisma.tag.count(),
    };
  }

  async getAllTags() {
    return await this.prisma.tag.findMany({
      include: { _count: { select: { pictures: true } } },
    });
  }

  async removeTag(id: string) {
    return await this.prisma.tag.delete({ where: { id: id } });
  }

  async updateTag(id: string, updateData: { name: string } | { src: string }) {
    return await this.prisma.tag.update({
      where: { id },
      include: { _count: { select: { pictures: true } } },
      data: { ...updateData },
    });
  }
}
