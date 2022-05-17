import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PicturesModule } from './pictures/pictures.module';
import { TagsModule } from './tags/tags.module';
import { DecoratorsModule } from './decorators/decorators.module';
import { FirebaseModule } from 'nestjs-firebase';
// import {} from '../animaldb-admin-firebase.json'
import { FileModule } from './file/file.module';
import { ReviewsModule } from './reviews/reviews.module';
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FirebaseModule.forRoot({
      googleApplicationCredential: 'animaldb-admin-firebase.json',
    }),
    AuthModule,
    UsersModule,
    PicturesModule,
    TagsModule,
    DecoratorsModule,
    FileModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
