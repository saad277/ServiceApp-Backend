import { Injectable, Scope, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceCreateDto } from './dto/service-create.dto';
import { ServiceRepository } from './service.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ServicService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(ServiceRepository)
    private serviceRepository: ServiceRepository,
  ) {}

  createService(service: ServiceCreateDto) {
    return this.serviceRepository.createService(service, this.request.user);
  }
}
