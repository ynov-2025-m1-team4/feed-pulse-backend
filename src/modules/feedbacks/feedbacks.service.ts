import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from './schemas/feedback.schema';
import { Model } from 'mongoose';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ChannelMetric } from '../metrics/interfaces/channel-metric.interface';
import { ThemeMetric } from '../metrics/interfaces/theme-metric.interface';
import { DailyRateMetric } from '../metrics/interfaces/daily-rate.interface';
import { SentimentMetric } from '../metrics/interfaces/sentiment-metric.interface';
import { AIService } from '../ai/ai.service';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel(Feedback.name) private model: Model<Feedback>,
    private aiService: AIService,
  ) {}

  async create(dto: CreateFeedbackDto): Promise<Feedback> {
    const analysis = await this.aiService.analyzeFeedback(dto.text);

    Logger.log('AI analysis result:', analysis);
    dto.sentimentScore = analysis.sentiment;
    dto.themes = analysis.themes;

    return await this.model.create(dto);
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

  async exists(filter): Promise<boolean> {
    return !!(await this.model.exists(filter));
  }

  async getChannelMetrics(): Promise<ChannelMetric[]> {
    return await this.model.aggregate([
      {
        $group: {
          _id: '$channel',
          feedbacks_count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          channel: '$_id',
          feedbacks_count: 1,
        },
      },
    ]);
  }

  async getThemeMetrics(): Promise<ThemeMetric[]> {
    return await this.model.aggregate([
      { $unwind: '$themes' },
      {
        $group: {
          _id: '$themes',
          feedbacks_count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          theme: '$_id',
          feedbacks_count: 1,
        },
      },
    ]);
  }

  async getDailyRateMetric(): Promise<DailyRateMetric> {
    const result = await this.model.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          rate: { $avg: '$count' },
        },
      },
    ]);

    return { rate: result.length ? result[0].rate : 0 };
  }

  async getSentimentMetrics(): Promise<SentimentMetric> {
    const avgResult = await this.model.aggregate([
      {
        $group: {
          _id: null,
          average_score: { $avg: '$sentimentScore' },
        },
      },
    ]);

    const distributionResult = await this.model.aggregate([
      {
        $project: {
          sentiment: {
            $cond: {
              if: { $gt: ['$sentimentScore', 0.3] },
              then: 'positive',
              else: {
                $cond: {
                  if: { $lt: ['$sentimentScore', -0.3] },
                  then: 'negative',
                  else: 'neutral',
                },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: '$sentiment',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalCount = await this.model.countDocuments();

    // Calculate critical rate (percentage of negative sentiments)
    const negativeCount =
      distributionResult.find((item) => item._id === 'negative')?.count || 0;

    const positiveCount =
      distributionResult.find((item) => item._id === 'positive')?.count || 0;

    const neutralCount =
      distributionResult.find((item) => item._id === 'neutral')?.count || 0;

    const critical_rate = totalCount ? negativeCount / totalCount : 0;

    return {
      average_score: avgResult.length ? avgResult[0].average_score : 0,
      critical_rate,
      distribution: {
        positive: totalCount ? positiveCount / totalCount : 0,
        neutral: totalCount ? neutralCount / totalCount : 0,
        negative: totalCount ? negativeCount / totalCount : 0,
      },
    };
  }
}
