import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { LocalGaurd } from './gaurds/local.gaurd';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiTags('auth')
  async signup(@Body() dto: AuthSignupDto) {
    return await this.authService.createUser(dto);
  }

  @Post('signin')
  @HttpCode(200)
  @UseGuards(LocalGaurd)
  @ApiTags('auth')
  @ApiBody({ type: AuthSigninDto })
  async signin(@Req() req: Request) {
    const user = req.user;
    return {
      token: await this.authService.getToken(user['id'], user['email']),
      user,
    };
  }
}
