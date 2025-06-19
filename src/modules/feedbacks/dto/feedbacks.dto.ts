import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFeedbackDto {
  userId: string;
  providerId: string;
  date: Date;
  channel: string;
  text: string;
  sentimentScore?: number;
  themes?: string[];
}

export class FeedbackResponseDto {
  @ApiProperty({ description: 'ID of the user who provided the feedback' })
  userId: string;

  @ApiProperty({ description: 'ID of the provider who received the feedback' })
  providerId: string;

  @ApiProperty({
    description: 'Date when the feedback was given',
    type: String,
    format: 'date-time',
  })
  date: Date;

  @ApiProperty({
    description:
      'Channel through which feedback was provided (e.g., email, chat, etc.)',
  })
  channel: string;

  @ApiProperty({ description: 'Text content of the feedback' })
  text: string;

  @ApiPropertyOptional({
    description: 'Sentiment score of the feedback (optional)',
  })
  sentimentScore?: number;

  @ApiPropertyOptional({
    description: 'Themes associated with the feedback (optional)',
    type: [String],
  })
  themes?: string[];
}

export class UpdateFeedbackDto {
  sentimentScore?: number;
  themes?: string[];
}
