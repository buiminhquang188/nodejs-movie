import { Roles } from '@/utils/enum';
import { IsAlpha, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UserCreateDto {
  @IsString()
  // @Length(8, 30)
  @IsAlpha()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsOptional()
  public oldPassword: string;

  @IsString()
  @IsOptional()
  public newPassword: string;

  @IsString()
  @IsOptional()
  public confirmPassword: string;
}
export class UpdateUserDto {
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Roles, { each: true })
  public roleID: Roles;
}

export class CreateUserDto {
  @IsString()
  // @Length(8, 30)
  @IsAlpha()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Roles, { each: true })
  public roleID: Roles;
}
