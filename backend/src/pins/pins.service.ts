// backend\src\pins\pins.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class PinsService {
  async createPin(): Promise<any> {
    return { message: 'Pin creation logic will be implemented later.' };
  }

  async getAllPins(): Promise<any> {
    return [{ message: 'Retrieve all pins logic will be implemented later.' }];
  }
}
