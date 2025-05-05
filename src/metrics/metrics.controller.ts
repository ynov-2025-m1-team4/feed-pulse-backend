import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsQueryDto } from './dto/metrics-query.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics(@Query() query: MetricsQueryDto) {
    switch (query.metric_value) {
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
          'metric_value must be one of: channels, themes, daily-rate, sentiments',
        );
    }
  }
}
