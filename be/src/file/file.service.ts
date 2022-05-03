import { Bucket } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { Stream } from 'stream';

@Injectable()
export class FileService {
  public storage: Bucket;
  public imageFileTypes = [
    { mineType: 'image/apng', extension: '.apng' },
    { mineType: 'image/avif', extension: '.avif' },
    { mineType: 'image/gif', extension: '.gif' },
    { mineType: 'image/jpeg', extension: '.jpg' },
    { mineType: 'image/jpeg', extension: '.jpeg' },
    { mineType: 'image/jpeg', extension: '.jfif' },
    { mineType: 'image/jpeg', extension: '.pjpeg' },
    { mineType: 'image/jpeg', extension: '.pjp' },
  ];

  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    private config: ConfigService,
  ) {
    this.storage = this.firebase.storage.bucket(this.config.get('BUCKET_NAME'));
  }

  async uploadFile(
    path: string,
    fileName: string,
    readStream: Stream,
  ): Promise<string> {
    const file = this.storage.file(`${path}/${fileName}`);
    const fileType = this.getTypeFile(fileName);
    const writeStream = file.createWriteStream({
      metadata: {
        contentType: fileType.mineType,
        firebaseStorageDownloadTokens: null,
      },
    });
    const pipedStreams = readStream.pipe(writeStream);
    const host = this.config.get('HOST');
    const result = new Promise<string>((resolve, reject) => {
      pipedStreams.on('error', function (err) {
        reject(err);
      });
      pipedStreams.on('finish', function () {
        resolve(`${host}/file/${encodeURI(file.name).replace(/\//g, '%2F')}`);
      });
    });
    return result;
  }

  async deleteFile(path: string, fileName: string) {
    const file = this.storage.file(`${path}/${fileName}`);
    return await file.delete();
  }

  getTypeFile(fileName: string) {
    const index = fileName.lastIndexOf('.');
    if (index === -1) {
      return null;
    }
    const fileType = this.imageFileTypes.find((t) => {
      return t.extension === fileName.substring(index);
    });
    return fileType;
  }
}
