import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({
    example: 'abc@gmail.com',
    description: "user's email address",
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'password123',
    description: "user's password",
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: 'JohnDoe',
    description: "user's pseudo",
  })
  pseudo: string;
}

export class RegisterResponseDto {
  @IsEmail()
  @ApiProperty({
    example: 'abc@gmail.com',
    description: "user's email address",
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'JohnDoe',
    description: "user's pseudo",
  })
  pseudo: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: "user's access token",
  })
  accessToken: string;
}
