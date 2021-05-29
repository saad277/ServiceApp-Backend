import {
  IsString,
  MinLength,
  MaxLength,
  //Matches,
  IsNumber,
  IsEmail,
  IsEnum,
  IsObject,
  IsBoolean,
} from 'class-validator';
import { UserRoles } from '../../user/user.roles.enum';

export class UserAuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  UserName: string;

  @IsEmail()
  Email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'Password Too Weak',
  //   })
  Password: string;

  @IsEnum(UserRoles)
  @IsNumber()
  Type: number;

  // @IsObject()
  // Location: { Lat: number; Long: number };

  @IsString()
  @MinLength(10)
  @MaxLength(20)
  Contact: string;

  // @IsString()
  // @MinLength(1)
  // @MaxLength(2)
  // Age: string;

  // @IsString()
  // @MinLength(1)
  // Language: string;

  // @IsString()
  // @MinLength(1)
  // Country: string;

  // @IsString()
  // @MinLength(1)
  // City: string;

  // @IsString()
  // @MinLength(1)
  // ProfileImg: string;
}
