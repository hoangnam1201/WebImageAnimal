import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGaurd } from 'src/auth/gaurds/jwt.gaurd';
import { FileService } from 'src/file/file.service';
import { Readable } from 'stream';
import { TagCreateDto } from './dto/tag-create.dto';
import { TagFindDto } from './dto/tag-find.dto';
import { TagGetDto } from './dto/tag-get.dto';
import { TagUpdateFileDto } from './dto/tag-update-file.dto';
import { TagUpdateDto } from './dto/tag-update.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(
    private tagService: TagsService,
    private fileService: FileService,
  ) {}

  @Post()
  @UseGuards(JwtGaurd)
  @UseInterceptors(FileInterceptor('file'))
  @ApiTags('tags')
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  async create(@Body() dto: TagCreateDto, @Req() req: Request) {
    const file = req.file;
    if (!file) throw new HttpException('file is required', 400);

    const tag = await this.tagService.createTag(dto.name);
    //upload file
    const stream = Readable.from(file.buffer);
    const fileType = this.fileService.getTypeFile(file.originalname);
    const src = await this.fileService
      .uploadFile('images', `${tag.id}${fileType.extension}`, stream)
      .catch((err) => {
        console.log(err);
        throw new HttpException('Internel Server Error', 500);
      });
    //
    return await this.tagService.updateTag(tag.id, { src });
  }

  @Delete(':id')
  @UseGuards(JwtGaurd)
  @ApiTags('tags')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  async delete(@Param() param) {
    const tag = await this.tagService.removeTag(param.id);
    const fileType = this.fileService.getTypeFile(tag.src);
    this.fileService.deleteFile('images', `${tag.id}${fileType.extension}`);
    return tag;
  }

  @Get()
  @ApiTags('tags')
  async get(@Query() dto: TagGetDto) {
    return await this.tagService.getTags(dto.take, dto.page * dto.take);
  }

  @Get('find')
  @ApiTags('tags')
  async find(@Query() dto: TagFindDto) {
    return await this.tagService.findTags(dto.searchStr, dto.take);
  }

  @Put(':id')
  @UseGuards(JwtGaurd)
  @ApiParam({ name: 'id' })
  @ApiTags('tags')
  @ApiBearerAuth()
  async update(@Body() dto: TagUpdateDto, @Param() param) {
    return await this.tagService.updateTag(param.id, dto);
  }

  @Put('update-file/:id')
  @UseGuards(JwtGaurd)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @ApiTags('tags')
  @ApiBody({ type: TagUpdateFileDto })
  @ApiBearerAuth()
  async updateFile(@Param() param, @Req() req: Request) {
    const file = req.file;
    if (!file) throw new HttpException('file is required', 400);

    const stream = Readable.from(file.buffer);
    const fileType = this.fileService.getTypeFile(file.originalname);
    const src = await this.fileService
      .uploadFile('images', `${param.id}${fileType.extension}`, stream)
      .catch((err) => {
        console.log(err);
        throw new HttpException('Internel Server Error', 500);
      });
    //
    return await this.tagService.updateTag(param.id, { src });
  }
}
