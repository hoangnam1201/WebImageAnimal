import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

class IdObject {
  id: string;
}

export class PictureCreateDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  tags: IdObject[];

  @ApiProperty({ format: 'binary' })
  file: string;
}
