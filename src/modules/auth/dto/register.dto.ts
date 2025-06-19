import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({
    example: 'abc@gmail.com',
    description: "user's email address",
  })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]+$/,
    {
      message:
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
    },
  )
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
