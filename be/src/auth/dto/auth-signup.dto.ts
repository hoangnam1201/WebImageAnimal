import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { IsEmailAlreadyExist } from 'src/decorators/is-email-already-exist.constraint copy';

export class AuthSignupDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsEmail()
  @IsEmailAlreadyExist()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
