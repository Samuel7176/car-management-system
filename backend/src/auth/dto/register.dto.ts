import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName!: string;

  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @MinLength(12)
  @MaxLength(72)
  password!: string;

  @IsOptional()
  @IsString()
  @Matches(/^(?:\+254|0)[17]\d{8}$/, {
    message: 'Phone must be a valid Kenyan mobile number.',
  })
  phone?: string;
}