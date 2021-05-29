import {
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  IsOptional,
  IsObject,
  IsEnum,
} from 'class-validator';

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
