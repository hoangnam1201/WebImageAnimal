import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class TagGetDto {
  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  @ApiProperty()
  page: number;

  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  take: number;
}
