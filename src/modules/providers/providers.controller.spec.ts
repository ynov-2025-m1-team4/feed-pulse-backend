import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { getModelToken } from '@nestjs/mongoose';
import { ProvidersModule } from './providers.module';
import { Provider } from './schemas/provider.schema';
import { User } from '../users/schemas/user.schema';

describe('ProviderController', () => {
  let controller: ProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvidersController],
      providers: [
        ProvidersService,
        {
          provide: getModelToken(Provider.name),
          useValue: ProvidersModule,
        },
      ],
    }).compile();

    controller = module.get<ProvidersController>(ProvidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
