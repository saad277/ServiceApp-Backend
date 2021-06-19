import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ServiceCreateDto } from './dto/service-create.dto';
import { CreateServiceBody } from '../swagger';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { RolesGuard } from '../guards/roles-guard';

import { Roles } from '../decorators/role-auth.decorator';
import { GetUser } from '../decorators/get-user.decorator';
import { UserRoles } from 'src/user/user.roles.enum';

@ApiBearerAuth('JWT-auth')
@ApiTags('Service')
@Controller('service')
export class ServicController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: CreateServiceBody })
  @Roles(UserRoles.Admin)
  @Post('/create')
  createService(@Body() body: ServiceCreateDto, @GetUser() user) {
    return { Success: 200 };
  }
}
