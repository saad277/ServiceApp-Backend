import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceBody {
  @ApiProperty()
  Name: string;

  @ApiProperty()
  Description: string;

  @ApiProperty()
  Img: string;
}
