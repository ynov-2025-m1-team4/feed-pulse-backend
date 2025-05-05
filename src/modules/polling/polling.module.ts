import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PollingService } from './polling.service';
import { ProvidersModule } from '../providers/providers.module';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';

@Module({
  imports: [HttpModule, ProvidersModule, FeedbacksModule],
  providers: [PollingService],
})
export class PollingModule {}
