export interface SentimentMetric {
  average_score: number;
  critical_rate: number;
  distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
}
