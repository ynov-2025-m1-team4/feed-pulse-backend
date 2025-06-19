import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersService } from './providers.service';
import { getModelToken } from '@nestjs/mongoose';
import { Provider } from './schemas/provider.schema';
import { NotFoundException } from '@nestjs/common';
import { CreateProviderDto, UpdateProviderDto } from './dto/provider.dto';

describe('ProvidersService', () => {
  let service: ProvidersService;
  let mockModel: any;

  const mockProvider = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test Provider',
    userId: 'user123',
    createdAt: new Date(),
    lastPolledAt: new Date(),
  };

  beforeEach(async () => {
    mockModel = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      updateOne: jest.fn(),
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvidersService,
        {
          provide: getModelToken(Provider.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<ProvidersService>(ProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a provider successfully', async () => {
      const createDto: CreateProviderDto = { name: 'Test Provider', url: '' };
      const userId = 'user123';
      const expectedProvider = { userId, ...createDto };

      mockModel.create.mockResolvedValue(mockProvider);

      const result = await service.create(createDto, userId);

      expect(mockModel.create).toHaveBeenCalledWith(expectedProvider);
      expect(result).toEqual(mockProvider);
    });
  });

  describe('findAll', () => {
    it('should return all providers sorted by createdAt', async () => {
      const providers = [mockProvider];
      mockModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(providers),
        }),
      });

      const result = await service.findAll();

      expect(mockModel.find).toHaveBeenCalledWith();
      expect(result).toEqual(providers);
    });
  });

  describe('findAllByUser', () => {
    it('should return providers for a specific user', async () => {
      const userId = 'user123';
      const providers = [mockProvider];
      mockModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(providers),
        }),
      });

      const result = await service.findAllByUser(userId);

      expect(mockModel.find).toHaveBeenCalledWith({ userId });
      expect(result).toEqual(providers);
    });
  });

  describe('findOne', () => {
    it('should return a provider by id', async () => {
      const id = '507f1f77bcf86cd799439011';
      mockModel.findById.mockResolvedValue(mockProvider);

      const result = await service.findOne(id);

      expect(mockModel.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockProvider);
    });

    it('should throw NotFoundException when provider not found', async () => {
      const id = '507f1f77bcf86cd799439011';
      mockModel.findById.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a provider successfully', async () => {
      const id = '507f1f77bcf86cd799439011';
      const updateDto: UpdateProviderDto = { name: 'Updated Provider' };
      const updatedProvider = { ...mockProvider, ...updateDto };

      mockModel.findByIdAndUpdate.mockResolvedValue(updatedProvider);

      const result = await service.update(id, updateDto);

      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateDto, { new: true });
      expect(result).toEqual(updatedProvider);
    });

    it('should throw NotFoundException when provider to update not found', async () => {
      const id = '507f1f77bcf86cd799439011';
      const updateDto: UpdateProviderDto = { name: 'Updated Provider' };
      mockModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(service.update(id, updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a provider successfully', async () => {
      const id = '507f1f77bcf86cd799439011';
      mockModel.findByIdAndDelete.mockResolvedValue(mockProvider);

      await service.remove(id);

      expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException when provider to remove not found', async () => {
      const id = '507f1f77bcf86cd799439011';
      mockModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getActiveProviders', () => {
    it('should return all active providers', async () => {
      const providers = [mockProvider];
      mockModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(providers),
      });

      const result = await service.getActiveProviders();

      expect(mockModel.find).toHaveBeenCalledWith();
      expect(result).toEqual(providers);
    });
  });

  describe('updateLastPolledAt', () => {
    it('should update lastPolledAt field', async () => {
      const id = '507f1f77bcf86cd799439011';
      mockModel.updateOne.mockResolvedValue({ acknowledged: true });

      await service.updateLastPolledAt(id);

      expect(mockModel.updateOne).toHaveBeenCalledWith(
        { _id: id },
        { $set: { lastPolledAt: expect.any(Date) } },
      );
    });
  });
});