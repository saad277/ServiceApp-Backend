import { IsString } from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  Email: string;

  @IsString()
  Password: string;
}
