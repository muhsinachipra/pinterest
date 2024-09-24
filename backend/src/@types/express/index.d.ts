// backend\src\@types\express\index.d.ts

import { User } from '../../users/user.schema'; // Adjust the path as needed

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
