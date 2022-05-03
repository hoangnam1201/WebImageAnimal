import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

class IdObject {
  id: string;
}

export class PictureUpdateDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @Type(() => IdObject)
  @ApiProperty()
  tags: IdObject[];
}
