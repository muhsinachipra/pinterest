// src/utils/generateToken.ts

import * as jwt from 'jsonwebtoken';
import { Response } from 'express';

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SEC);

  res.cookie('token', token, { httpOnly: true });
};

export default generateToken;
