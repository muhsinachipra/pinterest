// src/utils/generateToken.ts

import * as jwt from 'jsonwebtoken';
import { Response } from 'express';

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SEC);

  // Set the token in cookies or wherever you prefer
  res.cookie('token', token, { httpOnly: true }); // Adjust options as necessary
};

export default generateToken;
