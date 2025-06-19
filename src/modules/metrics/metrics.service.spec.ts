import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';
import { FeedbacksService } from '../feedbacks/feedbacks.service';
import { Feedback } from '../feedbacks/schemas/feedback.schema';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';
import { getModelToken } from '@nestjs/mongoose';
import { AIService } from '../ai/ai.service';

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricsService,
        FeedbacksService,
        {
          provide: getModelToken(Feedback.name),
          useValue: FeedbacksModule
        },
        AIService
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
