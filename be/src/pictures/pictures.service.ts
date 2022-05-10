import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PictureUpdateDto } from './dto/picture-update.dto';

@Injectable()
export class PicturesService {
  constructor(private prisma: PrismaService) {}

  async create(
    title: string,
    authorId: string,
    src: string,
    tagIds: { id: string }[],
  ) {
    return await this.prisma.picture.create({
      data: {
        title,
        author: { connect: { id: authorId } },
        src,
        tags: {
          connect: tagIds,
        },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.picture.delete({ where: { id } });
  }

  async update(id: string, dto: PictureUpdateDto) {
    return await this.prisma.picture.update({
      where: { id: id },
      data: { title: dto.title, tags: { connect: dto.tags } },
    });
  }

  async updateSrc(id: string, src: string) {
    return await this.prisma.picture.update({
      where: { id: id },
      data: { src },
    });
  }

  async getById(id: string) {
    return await this.prisma.picture.findUnique({
      where: { id },
      include: { tags: { select: { id: true, name: true, src: true } } },
    });
  }

  async get(skip: number, take: number) {
    return {
      records: await this.prisma.picture.findMany({
        take,
        skip,
        include: { tags: { select: { id: true, name: true, src: true } } },
      }),
      count: await this.prisma.picture.count(),
    };
  }

  async filter(tagIds: string[], skip: number, take: number) {
    console.log(tagIds);
    if (tagIds.length)
      return {
        records: await this.prisma.picture.findMany({
          where: { tagIds: { hasEvery: tagIds } },
          include: { tags: { select: { id: true, name: true, src: true } } },
          skip,
          take,
        }),
        count: await this.prisma.picture.count({
          where: { tagIds: { hasEvery: tagIds } },
        }),
      };
    return {
      records: await this.prisma.picture.findMany({
        include: { tags: { select: { id: true, name: true, src: true } } },
        skip,
        take,
      }),
      count: await this.prisma.picture.count(),
    };
  }
}
