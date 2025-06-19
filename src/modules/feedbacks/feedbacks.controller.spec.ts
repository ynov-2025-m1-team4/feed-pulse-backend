import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Feedback } from './schemas/feedback.schema';
import { FeedbacksModule } from './feedbacks.module';
import { AIService } from '../ai/ai.service';

describe('FeedbacksController', () => {
  let controller: FeedbacksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbacksController],
      providers: [FeedbacksService,
        {
          provide: getModelToken(Feedback.name),
          useValue: FeedbacksModule
        },
        AIService,
      ],
    }).compile();

    controller = module.get<FeedbacksController>(FeedbacksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
