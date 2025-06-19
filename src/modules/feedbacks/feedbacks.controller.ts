import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { FeedbacksService } from './feedbacks.service';
import { FeedbackResponseDto, UpdateFeedbackDto } from './dto/feedbacks.dto';

@ApiTags('Feedbacks')
@ApiBearerAuth('accessToken')
@Controller('feedbacks')
@UseGuards(AuthGuard('jwt'))
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Get('user')
  @ApiOperation({ summary: 'Get all feedbacks by the current user' })
  @ApiOkResponse({
    description: 'List of feedbacks by user',
    type: [FeedbackResponseDto],
  })
  async findAllByUser(@Request() req) {
    return this.feedbacksService.findAllByUser(String(req.user.userId));
  }

  @Get('provider/:providerId')
  @ApiOperation({ summary: 'Get all feedbacks for a provider' })
  @ApiParam({ name: 'providerId', description: 'ID of the provider' })
  @ApiOkResponse({
    description: 'List of feedbacks for provider',
    type: [FeedbackResponseDto],
  })
  @UseGuards(AuthGuard('jwt'))
  async findAllByProvider(@Param('providerId') providerId: string) {
    return this.feedbacksService.findAllByProvider(providerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a feedback by ID' })
  @ApiParam({ name: 'id', description: 'ID of the feedback' })
  @ApiOkResponse({
    description: 'Feedback found',
    type: FeedbackResponseDto,
  })
  async findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a feedback by ID' })
  @ApiParam({ name: 'id', description: 'ID of the feedback' })
  @ApiBody({ type: UpdateFeedbackDto })
  @ApiOkResponse({
    description: 'Feedback updated',
    type: FeedbackResponseDto,
  })
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() dto: UpdateFeedbackDto) {
    return this.feedbacksService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a feedback by ID' })
  @ApiParam({ name: 'id', description: 'ID of the feedback' })
  @ApiOkResponse({ description: 'Feedback deleted' })
  async remove(@Param('id') id: string) {
    return this.feedbacksService.remove(id);
  }
}
