import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dtos/create-message.dto';
import { Message, MessageDocument } from './models/message.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}
  async create(message: CreateMessageDto) {
    return (
      await this.messageModel.create({
        ...message,
        createdAt: new Date(),
      })
    ).populate('user');
  }

  async findByRoom(room: string) {
    return await this.messageModel
      .find({
        room: room,
      })
      .populate('user');
  }
}
