import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('channels')
  async getChannelMetrics() {
    return this.metricsService.getChannelMetrics();
  }

  @Get('themes')
  async getThemeMetrics() {
    return this.metricsService.getThemeMetrics();
  }

  @Get('daily-rate')
  async getDailyRate() {
    return this.metricsService.getDailyRateMetric();
  }

  @Get('sentiments')
  async getSentimentMetric() {
    return this.metricsService.getSentimentMetrics();
  }
}
