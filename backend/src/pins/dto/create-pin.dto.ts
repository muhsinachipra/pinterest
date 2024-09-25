// backend\src\pins\dto\create-pin.dto.ts

import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePinDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  // @IsString()
  // pin: string;

  @IsArray()
  tags: string[];
}
