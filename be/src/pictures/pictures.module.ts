import { Module } from '@nestjs/common';
import { FileModule } from 'src/file/file.module';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';

@Module({
  controllers: [PicturesController],
  providers: [PicturesService],
  imports: [FileModule],
})
export class PicturesModule {}
