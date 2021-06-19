import {
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  IsOptional,
  IsObject,
  IsEnum,
} from 'class-validator';

import { UserStatus } from '../user.status.enum';

export class UpdateUserProfileDto {
  @IsString()
  @MinLength(1)
  @MaxLength(2)
  @IsOptional()
  Age: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  Language: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  Country: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  City: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  ProfileImg: string;

  @IsObject()
  @IsOptional()
  Location: { Lat: number; Long: number };
}

export class UpdateStatusDto {
  @IsNumber()
  @IsEnum(UserStatus)
  Status: number;
}
