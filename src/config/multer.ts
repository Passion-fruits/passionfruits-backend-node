import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const s3 = new AWS.S3();

export const ProfileMulterConfigs: MulterOptions = {
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    key: (req, file: Express.Multer.File, cb) => {
      cb(null, `profile/${v4()} ${file.originalname}`);
    },
  }),
  limits: { fieldSize: 50 * 1024 * 1024 },
};

export const SongMulterConfigs: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `${process.cwd()}/upload/`;

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
        mkdirSync(uploadPath + 'song/');
        mkdirSync(uploadPath + 'short/');
        mkdirSync(uploadPath + 'cover/');
      }
      cb(null, uploadPath + 'song/');
    },

    filename: (req, file, cb) => {
      cb(null, `${v4()} ${file.originalname}`);
    },
  }),
  limits: { fieldSize: 50 * 1024 * 1024 },
};
