import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Provider } from './schemas/provider.schema';
import { Model } from 'mongoose';
import { CreateProviderDto, UpdateProviderDto } from './dto/provider.dto';

@Injectable()
export class ProvidersService {
  constructor(@InjectModel(Provider.name) private model: Model<Provider>) {}

  async create(dto: CreateProviderDto, userId: string): Promise<Provider> {
    return await this.model.create({ userId: userId, ...dto });
  }

  async findAll(): Promise<Provider[]> {
    return await this.model.find().sort({ createdAt: -1 }).exec();
  }

  async findAllByUser(userId: string): Promise<Provider[]> {
    return await this.model.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Provider> {
    const provider = await this.model.findById(id);
    if (!provider) throw new NotFoundException('Provider not found');
    return provider;
  }

  async update(id: string, dto: UpdateProviderDto): Promise<Provider> {
    const provider = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!provider) throw new NotFoundException('Provider not found');
    return provider;
  }

  async remove(id: string): Promise<void> {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Provider not found');
  }

  async getActiveProviders(): Promise<Provider[]> {
    return await this.model.find().exec();
  }

  async updateLastPolledAt(id: string): Promise<void> {
    await this.model.updateOne(
      { _id: id },
      { $set: { lastPolledAt: new Date() } },
    );
  }
}
