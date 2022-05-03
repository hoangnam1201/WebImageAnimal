import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TagCreateDto {
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty({ format: 'binary' })
  file: string;
}
