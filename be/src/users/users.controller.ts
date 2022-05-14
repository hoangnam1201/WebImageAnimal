import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGaurd } from 'src/auth/gaurds/jwt.gaurd';
import { GetUsersDto } from './dto/get-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtGaurd)
  @ApiBearerAuth()
  @ApiTags('users')
  async get(@Req() req: Request) {
    return await this.usersService.findByEmail(req.user['email']);
  }

  @Post('get')
  @UseGuards(JwtGaurd)
  @ApiBearerAuth()
  @ApiTags('users')
  async getUsers(@Body() dto: GetUsersDto) {
    return await this.usersService.get(
      dto.searchStr,
      dto.page * dto.take,
      dto.take,
    );
  }

  @Post('find')
  @ApiBearerAuth()
  @ApiTags('users')
  async find(@Body() dto: { take: number; searchStr: string }) {
    return await this.usersService.find(dto.searchStr, dto.take);
  }
}
