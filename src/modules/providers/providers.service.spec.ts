import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { getModelToken } from '@nestjs/mongoose';
import { Provider } from './schemas/provider.schema';
import { ProvidersModule } from './providers.module';

describe('ProviderService', () => {
  let service: ProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvidersService,
        {
          provide: getModelToken(Provider.name),
          useValue: ProvidersModule
        }
      ],
    }).compile();

    service = module.get<ProvidersService>(ProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
