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
}
