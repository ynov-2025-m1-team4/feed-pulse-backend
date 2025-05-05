import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChannelMetric } from './interfaces/channel-metric.interface';
import { ThemeMetric } from './interfaces/theme-metric.interface';
import { DailyRateMetric } from './interfaces/daily-rate.interface';
import { SentimentMetric } from './interfaces/sentiment-metric.interface';

@Injectable()
export class MetricsService {
    constructor(
        @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
    )  {}

    async getChannelMetrics(): Promise<ChannelMetric[]> {
        return await this.feedbackModel.aggregate([
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
        return await this.feedbackModel.aggregate([
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
        const result = await this.feedbackModel.aggregate([
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

        return { rate: result.length ? result[0].rate : 0};
    }

    async getSentimentMetrics(): Promise<SentimentMetric> {
        const avgResult = await this.feedbackModel.aggregate([
            {
              $group: {
                _id: null,
                average_score: { $avg: '$sentimentScore' },
              },
            },
        ]);
      
        const distributionResult = await this.feedbackModel.aggregate([
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
      
        const totalCount = await this.feedbackModel.countDocuments();
      
        // Calculate critical rate (percentage of negative sentiments)
        const negativeCount = distributionResult.find(
            (item) => item._id === 'negative',
        )?.count || 0;
          
          const positiveCount = distributionResult.find(
            (item) => item._id === 'positive',
          )?.count || 0;
          
          const neutralCount = distributionResult.find(
            (item) => item._id === 'neutral',
          )?.count || 0;
      
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
