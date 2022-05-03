import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthSigninDto {
  @IsEmail()
  @ApiProperty({ example: 'lamtvu@gmail.com' })
  email: string;

  @ApiProperty({ example: '123123' })
  @IsString()
  password: string;
}
