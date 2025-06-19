import { Controller, Get, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('metrics')
@ApiBearerAuth('accessToken')
@UseGuards(JwtAuthGuard)
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('channels')
  @ApiOperation({ summary: 'Get feedback count by channel' })
  @ApiResponse({
    status: 200,
    description: 'List of feedback counts by channel',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          channel: { type: 'string' },
          feedbacks_count: { type: 'number' },
        },
      },
    },
  })
  async getChannelMetrics() {
    return this.metricsService.getChannelMetrics();
  }

  @Get('themes')
  @ApiOperation({ summary: 'Get feedback count by theme' })
  @ApiResponse({
    status: 200,
    description: 'List of feedback counts by theme',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          theme: { type: 'string' },
          feedbacks_count: { type: 'number' },
        },
      },
    },
  })
  async getThemeMetrics() {
    return this.metricsService.getThemeMetrics();
  }

  @Get('daily-rate')
  @ApiOperation({ summary: 'Get average daily feedback rate' })
  @ApiResponse({
    status: 200,
    description: 'Average daily feedback rate',
    schema: {
      type: 'object',
      properties: {
        rate: { type: 'number' },
      },
    },
  })
  async getDailyRate() {
    return this.metricsService.getDailyRateMetric();
  }

  @Get('sentiments')
  @ApiOperation({ summary: 'Get sentiment metrics' })
  @ApiResponse({
    status: 200,
    description: 'Sentiment metrics',
    schema: {
      type: 'object',
      properties: {
        average_score: { type: 'number' },
        critical_rate: { type: 'number' },
        distribution: {
          type: 'object',
          properties: {
            positive: { type: 'number' },
            neutral: { type: 'number' },
            negative: { type: 'number' },
          },
        },
      },
    },
  })
  async getSentimentMetric() {
    return this.metricsService.getSentimentMetrics();
  }
}
