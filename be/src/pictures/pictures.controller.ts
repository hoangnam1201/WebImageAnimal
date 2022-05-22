import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGaurd } from 'src/auth/gaurds/jwt.gaurd';
import { FileService } from 'src/file/file.service';
import { Readable } from 'stream';
import { PictureCreateDto } from './dto/picture-create.dto';
import { PictureFindDto } from './dto/picture-find.dto';
import { PictureGetDto } from './dto/picture-get.dto';
import { PictureUpdateDto } from './dto/picture-update.dto';
import { PicturesService } from './pictures.service';

@Controller('pictures')
export class PicturesController {
  constructor(
    private pictureService: PicturesService,
    private fileService: FileService,
  ) {}

  @Get('by-id/:id')
  @ApiParam({ name: 'id' })
  @ApiTags('pictures')
  async getById(@Param() params) {
    return await this.pictureService.getById(params['id']).catch(() => {
      throw new InternalServerErrorException();
    });
  }

  @Post('get')
  @ApiTags('pictures')
  async get(@Body() dto: PictureGetDto) {
    return await this.pictureService.filter(
      dto.tagIds,
      dto.authorId,
      dto.page * dto.take,
      dto.take,
      dto.accepted,
    );
  }

  @Post('get-my-pictures')
  @UseGuards(JwtGaurd)
  @ApiTags('pictures')
  async getMyPicture(@Body() dto: PictureGetDto, @Req() req: Request) {
    const user = req.user;
    return await this.pictureService.filter(
      dto.tagIds,
      user['id'],
      dto.page * dto.take,
      dto.take,
      undefined,
    );
  }

  @Post('create')
  @UseGuards(JwtGaurd)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiTags('pictures')
  @ApiBearerAuth()
  async create(@Req() req: Request, @Body() dto: PictureCreateDto) {
    const file = req.file;
    if (!file) throw new HttpException('file is required', 400);

    const user = req.user;
    let picture = await this.pictureService
      .create(
        dto.title,
        user['id'],
        '',
        dto.tags,
        user['role'] === 'ADMIN' ? true : false,
      )
      .catch((err) => {
        console.log(err);
        if (err.code === 'P2025')
          throw new BadRequestException('not found tag in tags');
        throw new InternalServerErrorException();
      });
    //uploadfile
    const stream = Readable.from(file.buffer);
    const fileType = this.fileService.getTypeFile(file.originalname);
    const src = await this.fileService
      .uploadFile('images', `${picture.id}${fileType.extension}`, stream)
      .catch((err) => {
        console.log(err);
        throw new HttpException('Internel Server Error', 500);
      });
    //
    picture = await this.pictureService.updateSrc(picture.id, src);
    return picture;
  }

  @Delete(':id')
  @UseGuards(JwtGaurd)
  @ApiTags('pictures')
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  async delete(@Param() param) {
    const picture = await this.pictureService.delete(param.id);
    await this.fileService.deleteFile(
      'images',
      `${picture.id}${this.fileService.getTypeFile(picture.src).extension}`,
    );
    return picture;
  }

  @Put(':id')
  @UseGuards(JwtGaurd)
  @ApiTags('pictures')
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  async update(@Param() Param, @Body() dto: PictureUpdateDto) {
    return await this.pictureService.update(Param.id, dto);
  }

  @Put('accept/:id')
  @UseGuards(JwtGaurd)
  @ApiTags('pictures')
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  async accept(@Param() Param) {
    return await this.pictureService.acceptPicture(Param.id);
  }

  @Get('find')
  @ApiTags('pictures')
  async find(@Query() dto: PictureFindDto) {
    return await this.pictureService.find(dto.searchStr, dto.take);
  }
}
