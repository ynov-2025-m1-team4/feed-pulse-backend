import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('sentry')
@Controller('sentry')
export class SentryController {
  @Get('/debug-sentry')
  @ApiOperation({ summary: 'Trigger a Sentry error for testing' })
  @ApiResponse({ status: 500, description: 'Sentry error triggered' })
  getError() {
    throw new Error('My first Sentry error!');
  }
}
