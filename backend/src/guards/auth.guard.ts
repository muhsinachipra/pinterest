// backend\src\guards\auth.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.cookies?.token;
    if (!token) {
      return false;
    }

    try {
      const decodedData = this.jwtService.verify(token, {
        secret: process.env.JWT_SEC,
      });

      const user = await this.userModel.findById(decodedData.id);
      if (!user) {
        return false;
      }

      request['user'] = user;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
