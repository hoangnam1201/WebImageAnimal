import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

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
  @IsString()
  @IsOptional()
  authorId: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @IsBoolean()
  accepted: boolean;
}
