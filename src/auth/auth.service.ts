import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(
        loginData: LoginDto
    ): Promise<{ accessToken: string }> {
        const { email, password } = loginData;
        const user = await this.usersService.findByEmail(email);
        
        // TODO: obfuscate error message to prevent user enumeration
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return await this.generateToken(user._id);
    }

    async generateToken(userId) {
        const accessToken = this.jwtService.sign({ userId });

        return { accessToken };
    }

    async signUp(registrationData: RegisterDto) {
        const { email, password, pseudo } = registrationData;
        const emailInUse = await this.userModel.findOne({
            email: registrationData.email,
        });

        if (emailInUse) {
            throw new BadRequestException('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await this.userModel.create({
            pseudo,
            email,
            password: hashedPassword,
        });
    }

}
