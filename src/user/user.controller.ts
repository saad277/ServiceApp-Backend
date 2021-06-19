import {
  Controller,
  Patch,
  Body,
  Param,
  UseGuards,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { UpdateUserProfileBody, UpdateUserStatusBody } from '../swagger';
import {
  UpdateUserProfileDto,
  UpdateStatusDto,
} from './dto/update-user-profile-dto';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { RolesGuard } from '../guards/roles-guard';
import { UserRoles } from './user.roles.enum';

import { GetUser } from '../decorators/get-user.decorator';
import { Roles } from '../decorators/role-auth.decorator';
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

  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateUserStatusBody })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.Admin)
  @Put('/updateStatus/:id')
  async updateStatus(
    @Body() body: UpdateStatusDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateUser(id, body);
  }
}
