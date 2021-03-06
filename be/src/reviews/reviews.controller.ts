import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGaurd } from 'src/auth/gaurds/jwt.gaurd';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get('get-group-by-mood')
  @ApiTags('reviews')
  @UseGuards(JwtGaurd)
  @ApiBearerAuth()
  async get() {
    return await this.reviewService.get();
  }

  @Get('get-group-by-date')
  @ApiTags('reviews')
  @UseGuards(JwtGaurd)
  @ApiBearerAuth()
  async getGroupByDate(@Query('mode') mode: 'YEAR' | 'MONTH') {
    return await this.reviewService.getGroupByDate(mode);
  }

  @Post()
  @ApiTags('reviews')
  @ApiBearerAuth()
  async create(@Body() dto: CreateReviewDto, @Req() req: Request) {
    return await this.reviewService.create(dto.moodImprovement);
  }
}
