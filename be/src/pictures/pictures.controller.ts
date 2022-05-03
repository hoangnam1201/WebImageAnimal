import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGaurd } from 'src/auth/gaurds/jwt.gaurd';
import { FileService } from 'src/file/file.service';
import { Stream, Readable } from 'stream';
import { PictureCreateDto } from './dto/picture-create.dto';
import { PictureUpdateDto } from './dto/picture-update.dto';
import { PicturesService } from './pictures.service';

@Controller('pictures')
export class PicturesController {
  constructor(
    private pictureService: PicturesService,
    private fileService: FileService,
  ) {}

  @Post()
  @UseGuards(JwtGaurd)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiTags('pictures')
  @ApiBearerAuth()
  async create(@Req() req: Request, @Body() dto: PictureCreateDto) {
    const file = req.file;
    if (!file) throw new HttpException('file is required', 400);

    const user = req.user;
    let picture = await this.pictureService.create(
      dto.title,
      user['id'],
      '',
      dto.tags,
    );
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
    return await this.pictureService.delete(param.id);
  }

  @Put(':id')
  @UseGuards(JwtGaurd)
  @ApiTags('pictures')
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  async update(@Param() Param, @Body() dto: PictureUpdateDto) {
    return await this.pictureService.update(Param.id, dto);
  }
}
