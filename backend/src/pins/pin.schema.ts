// backend\src\pins\pin.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Pin extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  pin: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({
    type: {
      id: { type: String },
      url: { type: String },
    },
  })
  image: {
    id: string;
    url: string;
  };

  @Prop({
    type: [
      {
        user: { type: String, required: true },
        name: { type: String, required: true },
        comment: { type: String, required: true },
      },
    ],
  })
  comments: Array<{
    user: string;
    name: string;
    comment: string;
  }>;
}

export const PinSchema = SchemaFactory.createForClass(Pin);
