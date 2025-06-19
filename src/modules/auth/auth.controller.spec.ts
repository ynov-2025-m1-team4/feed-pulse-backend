import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: UsersModule
        },
        JwtService
      ]
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
