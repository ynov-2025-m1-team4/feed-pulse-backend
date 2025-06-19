import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto, UpdateProviderDto } from './dto/provider.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('Providers')
@Controller('providers')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard('jwt'))
export class ProvidersController {
  constructor(private readonly service: ProvidersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new provider' })
  @ApiBody({ type: CreateProviderDto })
  @ApiCreatedResponse({
    description: 'Provider created successfully',
    type: CreateProviderDto,
  })
  create(@Request() req, @Body() dto: CreateProviderDto) {
    return this.service.create(dto, req.user.userId as string);
  }

  @Get()
  @ApiOperation({ summary: 'Get all providers for the current user' })
  @ApiOkResponse({
    description: 'List of providers',
    type: [CreateProviderDto],
  })
  findAllByUser(@Request() req) {
    return this.service.findAllByUser(req.user.userId as string);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a provider by ID' })
  @ApiParam({ name: 'id', description: 'ID of the provider' })
  @ApiOkResponse({
    description: 'Provider found',
    type: CreateProviderDto,
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a provider by ID' })
  @ApiParam({ name: 'id', description: 'ID of the provider' })
  @ApiBody({ type: UpdateProviderDto })
  @ApiOkResponse({
    description: 'Provider updated',
    type: UpdateProviderDto,
  })
  update(@Param('id') id: string, @Body() dto: UpdateProviderDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a provider by ID' })
  @ApiParam({ name: 'id', description: 'ID of the provider' })
  @ApiOkResponse({ description: 'Provider deleted' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
