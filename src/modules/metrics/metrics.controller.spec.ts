import { Test, TestingModule } from '@nestjs/testing';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { FeedbacksService } from '../feedbacks/feedbacks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Feedback } from '../feedbacks/schemas/feedback.schema';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';
import { AIService } from '../ai/ai.service';

describe('MetricsController', () => {
  let controller: MetricsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricsController],
      providers: [MetricsService, FeedbacksService,
        {
          provide: getModelToken(Feedback.name),
          useValue: FeedbacksModule
        },
        AIService
      ]
    }).compile();

    controller = module.get<MetricsController>(MetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
