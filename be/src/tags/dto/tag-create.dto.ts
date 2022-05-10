import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsTagNameAlreadyExist } from 'src/decorators/is-tag-name-already-exist.constraint';

export class TagCreateDto {
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty({ format: 'binary' })
  @IsTagNameAlreadyExist()
  file: string;
}
