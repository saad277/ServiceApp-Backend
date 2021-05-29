import { IsString, IsNumber } from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  Email: string;

  @IsString()
  Password: string;

  @IsNumber()
  Type: number;
}
