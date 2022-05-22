import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stream } from 'stream';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class FileService {
  public storage;
  public imageFileTypes = [
    { mineType: 'image/apng', extension: '.apng' },
    { mineType: 'image/png', extension: '.png' },
    { mineType: 'image/avif', extension: '.avif' },
    { mineType: 'image/gif', extension: '.gif' },
    { mineType: 'image/jpeg', extension: '.jpg' },
    { mineType: 'image/jpeg', extension: '.jpeg' },
    { mineType: 'image/jpeg', extension: '.jfif' },
    { mineType: 'image/jpeg', extension: '.pjpeg' },
    { mineType: 'image/jpeg', extension: '.pjp' },
  ];

  constructor(
    // @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    private config: ConfigService,
  ) {
    const adminConfig: ServiceAccount = {
      projectId: config.get<string>('FIREBASE_PROJECT_ID'),
      privateKey: config
        .get<string>('FIREBASE_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
      clientEmail: config.get<string>('FIREBASE_CLIENT_EMAIL'),
    };
    // Initialize the firebase admin app
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
    });

    this.storage = admin.storage().bucket(config.get('BUCKET_NAME'));
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
    const e = await file.exists();
    if (!e[0]) throw new NotFoundException();
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
