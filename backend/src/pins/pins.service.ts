// backend\src\pins\pins.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pin } from './pin.schema';

@Injectable()
export class PinService {
  constructor(@InjectModel(Pin.name) private pinModel: Model<Pin>) {}

  async createPin(createPinDto): Promise<Pin> {
    const newPin = new this.pinModel(createPinDto);
    return newPin.save();
  }

  async getAllPins(): Promise<Pin[]> {
    return this.pinModel.find().exec();
  }
}
