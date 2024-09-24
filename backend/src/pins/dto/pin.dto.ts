// backend\src\pins\dto\pin.dto.ts

import { IsString } from 'class-validator';

export class CreatePinDto {
  @IsString()
  title: string;

  @IsString()
  pin: string;
}

export class CommentDto {
  @IsString()
  comment: string;
}
