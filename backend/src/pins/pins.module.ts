import { Module } from '@nestjs/common';
import { PinsService } from './pins.service';
import { PinsController } from './pins.controller';

@Module({
  providers: [PinsService],
  controllers: [PinsController]
})
export class PinsModule {}
