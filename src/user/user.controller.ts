import {
  Controller,
  Post,
  Patch,
  Body,
  ValidationPipe,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { GetUser } from '../decorators/get-user.decorator';

@ApiBearerAuth('JWT-auth')
@ApiTags('User')
@Controller('user')
export class UserController {
    
  @Patch('/updateProfile')
  @UseGuards(JwtAuthGuard)
  userProfileUpdate(@Body() body, @GetUser() user) {}
}
