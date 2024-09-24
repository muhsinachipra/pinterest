// backend\src\pins\dto\create-pin.dto.ts

import { IsString } from 'class-validator';

export class CreatePinDto {
  @IsString()
  title: string;

  @IsString()
  pin: string;
}
