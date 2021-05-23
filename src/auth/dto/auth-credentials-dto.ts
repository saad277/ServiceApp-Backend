import {
  IsString,
  MinLength,
  MaxLength,
  //Matches,
  IsNumber,
  IsEmail,
  IsEnum,
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
}
