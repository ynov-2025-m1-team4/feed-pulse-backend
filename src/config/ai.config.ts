import { registerAs } from '@nestjs/config';

export default registerAs('ai', () => ({
  apiKey: process.env.AI_API_KEY,
}));
