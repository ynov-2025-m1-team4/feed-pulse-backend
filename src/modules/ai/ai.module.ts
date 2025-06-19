import { Module } from '@nestjs/common';
import { AIService } from './ai.service';
import { ConfigModule } from '@nestjs/config';
import aiConfig from '../../config/ai.config';

@Module({
  imports: [ConfigModule.forFeature(aiConfig)],
  providers: [AIService],
  exports: [AIService],
})
export class AIModule {}
