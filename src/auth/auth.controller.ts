import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() registerData: RegisterDto) {
        return this.authService.signUp(registerData);
    }

    @Post('login')
    async signIn(@Body() loginData: LoginDto) {
        return this.authService.signIn(loginData);
    }

    @Post('logout')
    async logout(@Request() req) {
        return req.logout();
    }
    
}
