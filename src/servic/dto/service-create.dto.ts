import { IsString } from 'class-validator';

export class ServiceCreateDto {
  @IsString()
  Name: string;

  @IsString()
  Description: string;

  @IsString()
  Img: string;
}
