import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Feedback extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Provider', required: true })
  providerId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  channel: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: null })
  sentimentScore: number;

  @Prop({ type: [String], default: [] })
  themes: string[];
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
