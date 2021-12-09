import { Request } from 'express';
import { IJwtPayload } from '../jwt/interface/payload.interface';

export interface IUserReqeust extends Request {
  user: IJwtPayload;
}

export interface IMulterFile extends Express.Multer.File {
  location: string;
  key: string;
}