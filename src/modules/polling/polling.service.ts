import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProvidersService } from '../providers/providers.service';
import { FeedbacksService } from '../feedbacks/feedbacks.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateFeedbackDto } from '../feedbacks/dto/feedbacks.dto';
import { Provider } from '../providers/schemas/provider.schema';

@Injectable()
export class PollingService {
  private readonly logger = new Logger(PollingService.name);

  constructor(
    private readonly providersService: ProvidersService,
    private readonly feedbacksService: FeedbacksService,
    private readonly http: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS, { name: 'pollingFeedbacks' })
  async pollAllProviders() {
    this.logger.log('Polling all providers...');
    const providers: Provider[] = await this.providersService.findAll();
    for (const provider of providers) {
      this.logger.log('provider', provider);
      try {
        const from =
          provider.lastPolledAt?.toISOString() || new Date(0).toISOString();
        const urlWithFrom = `${provider.url}?from=${encodeURIComponent(from)}`;
        this.logger.log('from', from);

        const { data } = await firstValueFrom(this.http.get(urlWithFrom));
        if (!Array.isArray(data)) continue;

        Logger.log('data', data);
        for (const raw of data) {
          //   const exists = await this.feedbacksService.exists({
          //     userId: provider.userId,
          //     providerId: provider.id,
          //     text: raw.text,
          //     date: new Date(raw.date),
          //   });

          //   if (!exists) {
          const dto: CreateFeedbackDto = {
            userId: provider.userId.toString(),
            providerId: provider.id,
            date: new Date(raw.date),
            channel: raw.channel,
            text: raw.text,
          };
          await this.feedbacksService.create(dto);
        }

        await this.providersService.updateLastPolledAt(provider.id);
        this.logger.log(`Polled ${provider.name} (${provider.url})`);
      } catch (err) {
        this.logger.warn(`Failed to poll ${provider.name}: ${err.message}`);
      }
    }
  }
}
