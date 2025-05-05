import { Injectable } from '@nestjs/common';
import { ChannelMetric } from './interfaces/channel-metric.interface';
import { ThemeMetric } from './interfaces/theme-metric.interface';
import { DailyRateMetric } from './interfaces/daily-rate.interface';
import { SentimentMetric } from './interfaces/sentiment-metric.interface';
import { FeedbacksService } from '../feedbacks/feedbacks.service';

@Injectable()
export class MetricsService {
  constructor(private feedbackService: FeedbacksService) {}

  async getChannelMetrics(): Promise<ChannelMetric[]> {
    return await this.feedbackService.getChannelMetrics();
  }

  async getThemeMetrics(): Promise<ThemeMetric[]> {
    return await this.feedbackService.getThemeMetrics();
  }

  async getDailyRateMetric(): Promise<DailyRateMetric> {
    return await this.feedbackService.getDailyRateMetric();
  }

  async getSentimentMetrics(): Promise<SentimentMetric> {
    return await this.feedbackService.getSentimentMetrics();
  }
}
