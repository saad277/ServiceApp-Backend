import { Controller, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserProfileBody } from '../swagger';
import { UpdateUserProfileDto } from './dto/update-user-profile-dto';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { GetUser } from '../decorators/get-user.decorator';
import { UserService } from './user.service';
import { UserDetailsService } from 'src/user-details/user-details.service';

@ApiBearerAuth('JWT-auth')
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private userDetailService: UserDetailsService,
  ) {}

  @ApiBody({ type: UpdateUserProfileBody })
  @Patch('/updateProfile')
  @UseGuards(JwtAuthGuard)
  async userProfileUpdate(
    @Body() updatedUserProfileData: UpdateUserProfileDto,
    @GetUser() user,
  ) {
    const response = await this.userDetailService.updateProfile(
      updatedUserProfileData,
      user,
    );
    const updatedUser = await this.userService.getUser(user);

    return { Message: 'Profile Updated', Data: updatedUser };
  }
}
