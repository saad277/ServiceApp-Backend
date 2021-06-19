import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';

import { ServicService } from './servic.service';
import { ServiceCreateDto } from './dto/service-create.dto';
import { CreateServiceBody } from '../swagger';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { RolesGuard } from '../guards/roles-guard';

import { Roles } from '../decorators/role-auth.decorator';
import { UserRoles } from 'src/user/user.roles.enum';

@ApiBearerAuth('JWT-auth')
@ApiTags('Service')
@Controller('service')
export class ServicController {
  constructor(private serviceService: ServicService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: CreateServiceBody })
  @Roles(UserRoles.Admin)
  @Post('/create')
  createService(@Body() body: ServiceCreateDto) {
    return this.serviceService.createService(body);
  }

  @ApiParam({ name: 'id', required: true })
  @Roles(UserRoles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/delete/:id')
  deleteService(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.deleteService(id);
  }

  @ApiParam({ name: 'id', required: true })
  @Roles(UserRoles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/details/:id')
  serviceDetails(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.serviceDetails(id);
  }
}
