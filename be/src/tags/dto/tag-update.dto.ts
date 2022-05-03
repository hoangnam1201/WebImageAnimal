import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TagUpdateDto {
  @IsString()
  @ApiProperty()
  name: string;
}
