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
    @InjectModel(User.name) private readonly userModel: Model<User>, // Marked readonly for immutability
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.cookies?.token; // Using optional chaining to prevent undefined error
    if (!token) {
      return false; // Return false if token is not present
    }

    try {
      const decodedData = this.jwtService.verify(token, {
        secret: process.env.JWT_SEC,
      });

      const user = await this.userModel.findById(decodedData.id);
      if (!user) {
        return false; // Return false if user is not found
      }

      // Attach the user to the request object
      request['user'] = user;
      return true; // Return true to allow access
    } catch (error) {
      console.error(error); // Log error for debugging
      return false; // Return false for any error in verification
    }
  }
}
