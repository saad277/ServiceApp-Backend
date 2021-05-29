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
import { UpdateUserProfileBody } from '../swagger';
import { UpdateUserProfileDto } from './dto/update-user-profile-dto';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { GetUser } from '../decorators/get-user.decorator';
import { UserService } from './user.service';

@ApiBearerAuth('JWT-auth')
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({ type: UpdateUserProfileBody })
  @Patch('/updateProfile')
  @UseGuards(JwtAuthGuard)
  userProfileUpdate(
    @Body(ValidationPipe) updatedUserProfileData: UpdateUserProfileDto,
    @GetUser() user,
  ) {
    return this.userService.userUpdateProfile(updatedUserProfileData, user);
  }
}
