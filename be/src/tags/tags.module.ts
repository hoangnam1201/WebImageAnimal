import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { FileModule } from 'src/file/file.module';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  imports: [FileModule],
})
export class TagsModule {}
