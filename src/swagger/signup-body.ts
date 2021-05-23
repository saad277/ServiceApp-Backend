import { ApiProperty } from '@nestjs/swagger';

export class SignUpBody {
  @ApiProperty()
  UserName: string;

  @ApiProperty()
  Email: string;

  @ApiProperty()
  Password: string;

  @ApiProperty()
  Type: number;

  @ApiProperty()
  Location: { Lat: number; Long: number };

  @ApiProperty()
  Contact: string;

  @ApiProperty()
  Age: string;

  @ApiProperty()
  Language: string;

  @ApiProperty()
  Country: string;

  @ApiProperty()
  City: string;

  @ApiProperty()
  ProfileImg: string;
}
