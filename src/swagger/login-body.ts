import { ApiProperty } from '@nestjs/swagger';

export class LoginBody {
  @ApiProperty()
  Password: string;

  @ApiProperty()
  Type: number;

  @ApiProperty()
  Email: string;
}
