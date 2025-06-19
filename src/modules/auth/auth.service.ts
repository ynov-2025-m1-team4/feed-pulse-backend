import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginData: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginData;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user._id.toString(), email);
  }

  generateToken(userId: string, email: string) {
    const payload = { id: userId, email: email };

    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async signUp(registrationData: RegisterDto): Promise<RegisterResponseDto> {
    const { email, password, pseudo } = registrationData;
    const emailInUse = await this.userModel.findOne({
      email: registrationData.email,
    });

    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      pseudo,
      email,
      password: hashedPassword,
    });

    const accessToken = this.generateToken(
      user._id.toString(),
      email,
    ).accessToken;

    return {
      email,
      pseudo,
      accessToken,
    };
  }
}
