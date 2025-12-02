// src/auth/dto/register.dto.ts

import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  nama!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(8) 
  nim!: string;
}
