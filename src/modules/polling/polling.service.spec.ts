import { Test, TestingModule } from '@nestjs/testing';
import { PollingService } from './polling.service';
import { FeedbacksService } from '../feedbacks/feedbacks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Feedback } from '../feedbacks/schemas/feedback.schema';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';
import { AIService } from '../ai/ai.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ProvidersService } from '../providers/providers.service';
import { ProvidersModule } from '../providers/providers.module';
import { Provider } from '../providers/schemas/provider.schema';

describe('PollingService', () => {
  let service: PollingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        PollingService,
        ProvidersService,
        {
          provide: getModelToken(Provider.name),
          useValue: ProvidersModule,
        },
        FeedbacksService,
        {
          provide: getModelToken(Feedback.name),
          useValue: FeedbacksModule,
        },
        AIService,
      ],
    }).compile();

    service = module.get<PollingService>(PollingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
