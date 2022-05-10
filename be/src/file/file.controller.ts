import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('dowload/:filename')
  @ApiParam({ name: 'filename' })
  download(@Param() param, @Res() res: Response) {
    try {
      const file = this.fileService.storage.file(`images/${param.filename}`);
      const fileType = this.fileService.getTypeFile(file.name);
      res.setHeader('content-type', fileType.mineType);
      res.set({
        'Content-Type': fileType.mineType,
        'Content-Disposition': `attachment; filename="image.${fileType.extension}"`,
      });
      file.createReadStream().pipe(res);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Get(':path')
  @ApiParam({ name: 'path' })
  get(@Param() param, @Res() res: Response) {
    try {
      const file = this.fileService.storage.file(param.path);
      if (!file) throw new NotFoundException();
      console.log(file.name);
      res.setHeader(
        'content-type',
        this.fileService.getTypeFile(file.name).mineType,
      );
      file.createReadStream().pipe(res);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
