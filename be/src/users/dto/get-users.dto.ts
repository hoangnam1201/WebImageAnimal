import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  take: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  searchStr: string;
}
