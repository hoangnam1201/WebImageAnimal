import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetReviewsDto {
  @ApiProperty()
  @IsString()
  mode: 'YEAR' | 'MONTH';
}
