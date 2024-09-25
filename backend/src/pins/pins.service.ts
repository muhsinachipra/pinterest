// backend\src\pins\pins.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pin } from './pin.schema';
import { CreatePinDto } from './dto/create-pin.dto';
import { getDataUrl } from '../utils/getDataUrl';
import cloudinary from 'cloudinary';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class PinsService {
  constructor(@InjectModel(Pin.name) private pinModel: Model<Pin>) {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async createPin(
    createPinDto: CreatePinDto,
    file: Express.Multer.File,
    user: any,
  ): Promise<any> {
    const { title, tags } = createPinDto;

    const fileUrl = getDataUrl(file);
    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    const newPin = new this.pinModel({
      title,
      tags, // Save the tags
      image: {
        id: cloud.public_id,
        url: cloud.secure_url,
      },
      owner: user._id,
    });

    await newPin.save();

    return { message: 'Pin Created', newPin };
  }

  async getAllPins(): Promise<any> {
    return await this.pinModel.find().sort({ createdAt: -1 }); // Property 'find' does not exist on type 'typeof Pin'.ts(2339)
  }

  async getSinglePin(id: string): Promise<any> {
    const pin = await this.pinModel.findById(id).populate('owner', '-password'); // Property 'findById' does not exist on type 'typeof Pin'.ts(2339)
    if (!pin) {
      throw new HttpException('No Pin with this id', HttpStatus.NOT_FOUND);
    }
    return pin;
  }

  async commentOnPin(id: string, comment: string, user: any): Promise<any> {
    const pin = await this.pinModel.findById(id);
    if (!pin) {
      throw new HttpException('No Pin with this id', HttpStatus.NOT_FOUND);
    }

    pin.comments.push({
      _id: new Types.ObjectId(), // Generate a new ObjectId for the comment
      user: user._id,
      name: user.name,
      comment,
    });

    await pin.save();
    return { message: 'Comment Added' };
  }

  async deleteComment(id: string, commentId: string, user: any): Promise<any> {
    const pin = await this.pinModel.findById(id);
    if (!pin) {
      throw new HttpException('No Pin with this id', HttpStatus.NOT_FOUND);
    }

    const commentIndex = pin.comments.findIndex(
      (item) => item._id.toString() === commentId, // Property '_id' does not exist on type '{ user: string; name: string; comment: string; }'.ts(2339)
    );
    if (commentIndex === -1) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    const comment = pin.comments[commentIndex];
    if (comment.user.toString() === user._id.toString()) {
      pin.comments.splice(commentIndex, 1);
      await pin.save();
      return { message: 'Comment Deleted' };
    } else {
      throw new HttpException(
        'You are not owner of this comment',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async deletePin(id: string, user: any): Promise<any> {
    const pin = await this.pinModel.findById(id);
    if (!pin) {
      throw new HttpException('No Pin with this id', HttpStatus.NOT_FOUND);
    }

    if (pin.owner.toString() !== user._id.toString()) {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }

    await cloudinary.v2.uploader.destroy(pin.image.id);
    await pin.deleteOne();

    return { message: 'Pin Deleted' };
  }

  async updatePin(
    id: string,
    updatePinDto: CreatePinDto,
    user: any,
  ): Promise<any> {
    const pin = await this.pinModel.findById(id);
    if (!pin) {
      throw new HttpException('No Pin with this id', HttpStatus.NOT_FOUND);
    }

    if (pin.owner.toString() !== user._id.toString()) {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }

    pin.title = updatePinDto.title;
    // pin.pin = updatePinDto.pin;

    await pin.save();
    return { message: 'Pin Updated' };
  }

  async likePin(pinId: string, userId: string) {
    const pin = await this.pinModel.findById(pinId);
    if (!pin) throw new HttpException('Pin not found', HttpStatus.NOT_FOUND);

    const userObjectId = new Types.ObjectId(userId);
    if (!pin.likes.includes(userObjectId)) {
      pin.likes.push(userObjectId);
      await pin.save();
      return { message: 'Pin liked successfully' };
    } else {
      throw new HttpException(
        'You have already liked this pin',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async unlikePin(pinId: string, userId: string) {
    const pin = await this.pinModel.findById(pinId);
    if (!pin) throw new HttpException('Pin not found', HttpStatus.NOT_FOUND);

    const userObjectId = new Types.ObjectId(userId);
    if (pin.likes.includes(userObjectId)) {
      pin.likes = pin.likes.filter((id) => id.toString() !== userId);
      await pin.save();
      return { message: 'Pin unliked successfully' };
    } else {
      throw new HttpException(
        'You have not liked this pin',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
