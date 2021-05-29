import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileBody {
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

  @ApiProperty()
  Location: { Lat: number; Long: number };
}
