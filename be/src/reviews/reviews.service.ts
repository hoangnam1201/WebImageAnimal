import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  checkAlreadyReview(userId) {
    return this.prisma.review.findFirst({ where: { userId: userId } });
  }

  create(userId: string, moodImprovement: number) {
    return this.prisma.review.create({
      data: { moodImprovement, user: { connect: { id: userId } } },
    });
  }

  async get() {
    return await this.prisma.review.groupBy({
      by: ['moodImprovement'],
      _count: { _all: true },
    });
  }

  async getGroupByDate(mode: 'YEAR' | 'MONTH') {
    const format = mode === 'YEAR' ? '%Y' : '%Y-%m';
    return {
      records: await this.prisma.review.aggregateRaw({
        pipeline: [
          {
            $group: {
              _id: { $dateToString: { format: format, date: '$createdAt' } },
              avg: { $avg: '$moodImprovement' },
              count: { $sum: 1 },
            },
          },
        ],
      }),
      rangeDate: await this.prisma.review.aggregate({
        _min: { createdAt: true },
        _max: { createdAt: true },
      }),
    };
  }
}
