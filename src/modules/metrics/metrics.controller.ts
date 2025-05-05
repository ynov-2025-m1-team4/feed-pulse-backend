import { Controller, Get, Query, BadRequestException, Param } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsQueryDto } from './dto/metrics-query.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get(":metric")
  async getMetrics(@Param('metric') metric: string) {
    switch (metric) {
      case 'channels':
        return this.metricsService.getChannelMetrics();
      case 'themes':
        return this.metricsService.getThemeMetrics();
      case 'daily-rate':
        return this.metricsService.getDailyRateMetric();
      case 'sentiments':
        return this.metricsService.getSentimentMetrics();
      default:
        throw new BadRequestException(
          'metric value must be one of: channels, themes, daily-rate, sentiments',
        );
    }
  }
}
