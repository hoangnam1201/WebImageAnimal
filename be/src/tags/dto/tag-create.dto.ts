import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsTagNameAlreadyExist } from 'src/decorators/is-tag-name-already-exist.constraint';

export class TagCreateDto {
  @IsString()
  @ApiProperty()
  @IsTagNameAlreadyExist()
  name: string;

  @ApiProperty({ format: 'binary' })
  file: string;
}
