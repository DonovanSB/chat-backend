import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from '../../users/models/user.model';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user: User;

  @Prop()
  room: string;

  @Prop()
  message: string;

  @Prop()
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
