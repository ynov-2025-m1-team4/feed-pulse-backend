import { Injectable } from '@nestjs/common';
import { ChannelMetric } from './interfaces/channel-metric.interface';
import { ThemeMetric } from './interfaces/theme-metric.interface';
import { DailyRateMetric } from './interfaces/daily-rate.interface';
import { SentimentMetric } from './interfaces/sentiment-metric.interface';
import { FeedbacksService } from '../feedbacks/feedbacks.service';

@Injectable()
export class MetricsService {
  constructor(private feedbackService: FeedbacksService) {}

  async getChannelMetricsbyUser(userId: string): Promise<ChannelMetric[]> {
    return await this.feedbackService.getChannelMetricsByUser(userId);
  }

  async getThemeMetricsbyUser(userId: string): Promise<ThemeMetric[]> {
    return await this.feedbackService.getThemeMetricsByUser(userId);
  }

  async getDailyRateMetricbyUser(userId: string): Promise<DailyRateMetric> {
    return await this.feedbackService.getDailyRateMetricByUser(userId);
  }

  async getSentimentMetricsbyUser(userId: string): Promise<SentimentMetric> {
    return await this.feedbackService.getSentimentMetricsByUser(userId);
  }
}
