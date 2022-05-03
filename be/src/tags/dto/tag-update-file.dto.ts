import { ApiProperty } from '@nestjs/swagger';

export class TagUpdateFileDto {
  @ApiProperty({ format: 'binary' })
  file: string;
}
