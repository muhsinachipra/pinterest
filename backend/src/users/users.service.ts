// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.schema'; // Import the User schema
import * as bcrypt from 'bcryptjs';
import generateToken from 'src/utils/generateToken'; // Adjust the import based on your structure
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async registerUser(
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    res: Response,
  ) {
    let user = await this.userModel.findOne({ email });

    if (user) {
      return {
        status: 400,
        message: 'Already have an account with this email',
      };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await this.userModel.create({ name, email, password: hashPassword });
    generateToken(user._id.toString(), res);

    return { status: 201, user, message: 'User Registered' };
  }

  async loginUser(
    { email, password }: { email: string; password: string },
    res: Response,
  ) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return { status: 400, message: 'No user with this email' };
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return { status: 400, message: 'Wrong password' };
    }

    generateToken(user._id.toString(), res);

    return { status: 200, user, message: 'Logged in' };
  }

  async myProfile(userId: string) {
    const user = await this.userModel.findById(userId);
    return user;
  }

  async userProfile(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    return user;
  }

  async followAndUnfollowUser(userId: string, loggedInUserId: string) {
    const user = await this.userModel.findById(userId);
    const loggedInUser = await this.userModel.findById(loggedInUserId);

    if (!user) {
      return { status: 400, message: 'No user with this id' };
    }

    if (user._id.toString() === loggedInUser._id.toString()) {
      return { status: 400, message: "You can't follow yourself" };
    }

    // Cast _id to Types.ObjectId explicitly
    const loggedInUserIdObj = new Types.ObjectId(loggedInUser._id.toString());
    const userIdObj = new Types.ObjectId(user._id.toString());

    // Follow/Unfollow logic
    if (user.followers.includes(loggedInUserIdObj)) {
      // Unfollow logic
      const indexFollowing = loggedInUser.following.indexOf(userIdObj);
      const indexFollowers = user.followers.indexOf(loggedInUserIdObj);
      loggedInUser.following.splice(indexFollowing, 1);
      user.followers.splice(indexFollowers, 1);
    } else {
      // Follow logic
      loggedInUser.following.push(userIdObj);
      user.followers.push(loggedInUserIdObj);
    }

    await loggedInUser.save();
    await user.save();

    return {
      message: user.followers.includes(loggedInUserIdObj)
        ? 'User followed'
        : 'User unfollowed',
    };
  }

  async logOutUser(res: Response) {
    res.cookie('token', '', { maxAge: 0 }); // Clear the token cookie

    return {
      message: 'Logged Out Successfully',
    };
  }
}
