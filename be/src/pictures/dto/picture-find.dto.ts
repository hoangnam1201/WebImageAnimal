import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class PictureFindDto {
  @ApiProperty()
  @IsString()
  searchStr: string;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  take: number;
}
