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
}
