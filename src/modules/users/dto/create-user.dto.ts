import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: "Pseudo de l'utilisateur",
    example: 'John Doe',
    minLength: 2,
  })
  @MinLength(2)
  @IsString()
  readonly username: string;

  @ApiProperty({
    description: "Email unique de l'utilisateur",
    example: 'john.doe@example.com',
    format: 'email',
    uniqueItems: true,
    type: String,
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Mot de passe sécurisé',
    example: 'S3cur3P@ss',
    minLength: 8,
    pattern: '^(?=.[a-z])(?=.[A-Z])(?=.\\d)(?=.[@$!%?&])[A-Za-z\\d@$!%?&]{8,}$',
    type: String,
  })
  readonly password: string;
}
