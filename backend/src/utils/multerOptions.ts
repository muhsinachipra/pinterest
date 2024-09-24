// backend\src\utils\multerOptions.ts

import * as multer from 'multer';

export const multerOptions = {
  storage: multer.memoryStorage(),
};
