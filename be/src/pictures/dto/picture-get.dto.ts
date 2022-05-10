import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, Length } from 'class-validator';

export class PictureGetDto {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @Length(24, 24, { each: true })
  tagIds: string[];

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  take: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  page: number;
}
