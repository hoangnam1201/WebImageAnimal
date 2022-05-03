import {
  Controller,
  Get,
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

  @Get('dowload/:path')
  @ApiParam({ name: 'path' })
  download(@Param() param) {
    const file = this.fileService.storage.file(param.path);
    return new StreamableFile(file.createReadStream());
  }

  @Get(':path')
  @ApiParam({ name: 'path' })
  get(@Param() param, @Res() res: Response) {
    const file = this.fileService.storage.file(param.path);
    if (!file) throw new NotFoundException();
    console.log(file.name);
    res.setHeader(
      'content-type',
      this.fileService.getTypeFile(file.name).mineType,
    );
    file.createReadStream().pipe(res);
  }
}
