import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({
    description: "The created user's data with accessToken",
    type: RegisterResponseDto,
  })
  async register(
    @Body() registerData: RegisterDto,
  ): Promise<RegisterResponseDto> {
    return await this.authService.signUp(registerData);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log the user in by returning an access token' })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    description: "The user's access token",
    type: LoginResponseDto,
  })
  async signIn(@Body() loginData: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.signIn(loginData);
  }

  @Post('logout')
  logout(@Request() req) {
    return req.logout();
  }
}
