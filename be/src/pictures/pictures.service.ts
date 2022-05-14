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
    accepted: boolean,
  ) {
    return await this.prisma.picture.create({
      include: {
        tags: { select: { id: true, name: true, src: true } },
        author: { select: { id: true, username: true, email: true } },
      },
      data: {
        title,
        author: { connect: { id: authorId } },
        accepted,
        src,
        tags: {
          connect: tagIds,
        },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.picture.delete({
      where: { id },
      include: {
        tags: { select: { id: true, name: true, src: true } },
        author: { select: { id: true, username: true, email: true } },
      },
    });
  }

  async update(id: string, dto: PictureUpdateDto) {
    return await this.prisma.picture.update({
      where: { id: id },
      data: { title: dto.title, tags: { set: dto.tags } },
      include: {
        tags: { select: { id: true, name: true, src: true } },
        author: { select: { id: true, username: true, email: true } },
      },
    });
  }
  async acceptPicture(id: string) {
    return await this.prisma.picture.update({
      where: { id: id },
      data: { accepted: true },
      include: {
        tags: { select: { id: true, name: true, src: true } },
        author: { select: { id: true, username: true, email: true } },
      },
    });
  }

  async updateSrc(id: string, src: string) {
    return await this.prisma.picture.update({
      where: { id: id },
      data: { src },
      include: {
        tags: { select: { id: true, name: true, src: true } },
        author: { select: { id: true, username: true, email: true } },
      },
    });
  }

  async getById(id: string) {
    return await this.prisma.picture.findUnique({
      where: { id },
      include: {
        tags: { select: { id: true, name: true, src: true } },
        author: { select: { id: true, username: true, email: true } },
      },
    });
  }

  async get(skip: number, take: number) {
    return {
      records: await this.prisma.picture.findMany({
        take,
        skip,
        include: {
          tags: { select: { id: true, name: true, src: true } },
          author: { select: { id: true, username: true, email: true } },
        },
      }),
      count: await this.prisma.picture.count(),
    };
  }

  async filter(
    tagIds: string[],
    authorId: string,
    skip: number,
    take: number,
    accepted: boolean,
  ) {
    const tagQuery = tagIds?.length ? { hasSome: tagIds } : undefined;

    return {
      records: await this.prisma.picture.findMany({
        where: { tagIds: tagQuery, authorId: authorId, accepted: accepted },
        include: {
          tags: {
            select: { id: true, name: true, src: true },
          },
          author: { select: { id: true, username: true, email: true } },
        },
        orderBy: [{ createdAt: 'desc' }],
        skip,
        take,
      }),
      count: await this.prisma.picture.count({
        where: {
          tagIds: { hasEvery: tagIds },
          authorId: authorId,
          accepted: accepted,
        },
      }),
    };
  }
}
