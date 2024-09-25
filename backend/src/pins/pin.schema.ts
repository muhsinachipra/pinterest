// backend\src\pins\pin.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Pin extends Document {
  @Prop({ required: true })
  title: string;

  // @Prop({ required: true })
  // pin: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  likes: Types.ObjectId[];

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
        _id: { type: Types.ObjectId, auto: true },
        user: { type: String, required: true },
        name: { type: String, required: true },
        comment: { type: String, required: true },
      },
    ],
  })
  comments: Array<{
    _id: Types.ObjectId;
    user: string;
    name: string;
    comment: string;
  }>;
}

export const PinSchema = SchemaFactory.createForClass(Pin);
