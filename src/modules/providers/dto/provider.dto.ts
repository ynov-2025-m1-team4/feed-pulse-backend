import { ApiProperty } from '@nestjs/swagger';

export class CreateProviderDto {
  @ApiProperty({ description: 'Name of the provider' })
  name: string;

  @ApiProperty({ description: 'URL of the provider' })
  url: string;
}

export class UpdateProviderDto {
  name?: string;
  url?: string;
  lastPolledAt?: Date;
}
