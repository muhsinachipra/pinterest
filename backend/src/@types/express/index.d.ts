// backend\src\@types\express\index.d.ts

import { User } from '../../users/user.schema';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
