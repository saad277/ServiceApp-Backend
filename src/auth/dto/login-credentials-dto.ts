import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCredentialsDto {
  @ApiProperty()
  @IsString()
  Email: string;

  @ApiProperty()
  @IsString()
  Password: string;

  @ApiProperty()
  @IsNumber()
  Type: number;
}
