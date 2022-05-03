import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagUpdateDto } from './dto/tag-update.dto';

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

  async getTags(take: number, skip: number) {
    return {
      records: await this.prisma.tag.findMany({
        take: take,
        skip: skip,
      }),
      count: await this.prisma.tag.count(),
    };
  }

  async removeTag(id: string) {
    await this.prisma.picture.deleteMany({
      where: { tagIds: { has: id } },
    });
    return await this.prisma.tag.delete({ where: { id: id } });
  }

  async updateTag(id: string, updateData: { name: string } | { src: string }) {
    return await this.prisma.tag.update({
      where: { id },
      data: { ...updateData },
    });
  }
}
