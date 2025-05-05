import { IsIn, IsString } from 'class-validator';

export class MetricsQueryDto {
  @IsString()
  @IsIn(['channels', 'themes', 'daily-rate', 'sentiments'])
  metric_value: string;
}
