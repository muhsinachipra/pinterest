// backend\src\utils\uploadFile.interceptor.ts

import { Injectable } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multerOptions';

@Injectable()
export class UploadFileInterceptor extends FileInterceptor(
  'file',
  multerOptions,
) {}
