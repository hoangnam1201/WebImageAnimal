import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class TagFindDto {
  @IsString()
  @ApiProperty()
  searchStr: string;

  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  take: number;
}
