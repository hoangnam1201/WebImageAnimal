import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { IsEmailAlreadyExist } from 'src/decorators/is-email-already-exist.constraint';
import { IsUsernameAlreadyExist } from 'src/decorators/is-username-already-exist.constraint';

export class AuthSignupDto {
  @IsString()
  @ApiProperty()
  @IsUsernameAlreadyExist()
  username: string;

  @IsEmail()
  @IsEmailAlreadyExist()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
