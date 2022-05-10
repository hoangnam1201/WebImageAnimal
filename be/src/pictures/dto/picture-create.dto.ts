import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, Length, ValidateNested } from 'class-validator';

class IdObject {
  @IsString()
  @Length(24, 24)
  id: string;
}

export class PictureCreateDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsArray()
  @ApiProperty()
  @Type(() => IdObject)
  @ValidateNested({ each: true })
  tags: IdObject[];

  @ApiProperty({ format: 'binary' })
  file: string;
}
