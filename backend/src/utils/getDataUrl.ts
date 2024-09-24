// src/utils/getDataUrl.ts

import DataUriParser from 'datauri/parser';
import path from 'path';

export const getDataUrl = (file: Express.Multer.File) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};
