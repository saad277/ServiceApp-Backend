import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNumber,
} from 'class-validator';

export class UserAuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  UserName: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'Password Too Weak',
  //   })
  Password: string;

  @IsNumber()
  Type: number;
}
