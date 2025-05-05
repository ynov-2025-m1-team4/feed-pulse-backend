import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from './schemas/feedback.schema';
import { Model } from 'mongoose';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbacksService {
  constructor(@InjectModel(Feedback.name) private model: Model<Feedback>) {}

  async create(dto: CreateFeedbackDto): Promise<Feedback> {
    return this.model.create(dto);
  }

  async findAllByUser(userId: string): Promise<Feedback[]> {
    return this.model.find({ userId }).sort({ date: -1 }).exec();
  }

  async findAllByProvider(providerId: string): Promise<Feedback[]> {
    return this.model.find({ providerId }).sort({ date: -1 }).exec();
  }

  async findOne(id: string): Promise<Feedback> {
    const fb = await this.model.findById(id);
    if (!fb) throw new NotFoundException('Feedback not found');
    return fb;
  }

  async update(id: string, dto: UpdateFeedbackDto): Promise<Feedback> {
    const fb = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!fb) throw new NotFoundException('Feedback not found');
    return fb;
  }

  async remove(id: string): Promise<void> {
    const res = await this.model.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Feedback not found');
  }
}
