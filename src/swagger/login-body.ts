import { ApiProperty } from '@nestjs/swagger';

export class LoginBody {
  @ApiProperty()
  Email: string;

  @ApiProperty()
  Password: string;

  @ApiProperty()
  Type: number;
}
