export class CreateFeedbackDto {
  userId: string;
  providerId: string;
  date: Date;
  channel: string;
  text: string;
  sentimentScore?: number;
  themes?: string[];
}
