import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    return await this.authService.signUp(registerData);
  }

  @Post('login')
  async signIn(@Body() loginData: LoginDto): Promise<{ accessToken: string }> {
    return await this.authService.signIn(loginData);
  }

  @Post('logout')
  logout(@Request() req) {
    return req.logout();
  }
}
