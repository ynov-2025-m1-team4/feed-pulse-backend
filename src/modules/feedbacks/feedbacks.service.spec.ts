import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksService } from './feedbacks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Feedback } from './schemas/feedback.schema';
import { FeedbacksModule } from './feedbacks.module';
import { AIService } from '../ai/ai.service';

describe('FeedbacksService', () => {
  let service: FeedbacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbacksService,
        {
          provide: getModelToken(Feedback.name),
          useValue: FeedbacksModule,
        },
        AIService,
      ],
    }).compile();

    service = module.get<FeedbacksService>(FeedbacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
