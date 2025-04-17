import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class LoginUserDto {
  @ApiProperty({
    description: 'Email unique de l\'utilisateur',
    example: 'john.doe@example.com',
    format: 'email',
    uniqueItems: true,
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Mot de passe sécurisé',
    example: 'S3cur3P@ss',
    minLength: 8,
    pattern: '^(?=.[a-z])(?=.[A-Z])(?=.\\d)(?=.[@$!%?&])[A-Za-z\\d@$!%?&]{8,}$',
    type: String,
  })
  @IsNotEmpty()
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least 1 uppercase letter (A-Z)',
  })
  @Matches(/(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least 1 symbol (!@#$%^&*)',
  })
  readonly password: string;
}