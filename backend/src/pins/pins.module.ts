// backend\src\pins\pins.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PinsController } from './pins.controller';
import { PinsService } from './pins.service';
import { Pin, PinSchema } from './pin.schema';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SEC,
    }),
    UsersModule,
  ],
  controllers: [PinsController],
  providers: [PinsService, AuthGuard],
  exports: [PinsService],
})
export class PinsModule {}
