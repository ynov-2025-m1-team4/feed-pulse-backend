import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private readonly endpoint = 'https://api.deepseek.com/v1/chat/completions';
  private configService: ConfigService;

  async analyzeFeedback(
    text: string,
  ): Promise<{ sentiment: number; themes: string[] }> {
    const prompt = `
You are an assistant that analyzes customer feedback.

  Given the following message:
  "${text}"

  Return a JSON object with:
  - "sentiment": a number between -1 (very negative) and 1 (very positive)
  - "themes": a list of key topics discussed

  Respond only with JSON like:
  {
    "sentiment": 0.6,
    "themes": ["support", "response time"]
  }
`;

    try {
      const response = await axios.post(
        this.endpoint,
        {
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.AI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      let content = response.data.choices?.[0]?.message?.content;
      Logger.log('AI response:', content);

      // Strip markdown code block formatting if present
      content = content.trim();
      if (content.startsWith('```')) {
        content = content
          .replace(/```(?:json)?\n?/, '')
          .replace(/```$/, '')
          .trim();
      }
      const json = JSON.parse(content);

      return {
        sentiment: Math.max(-1, Math.min(1, parseFloat(json.sentiment))),
        themes: Array.isArray(json.themes) ? json.themes.map(String) : [],
      };
    } catch (error) {
      this.logger.error('DeepSeek API error:', error.message);
      throw new Error('Failed to analyze feedback');
    }
  }
}
