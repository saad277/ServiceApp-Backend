import { Repository, EntityRepository } from 'typeorm';
import { Service } from '../entities/service.schema.entity';
import { InternalServerErrorException } from '@nestjs/common';

import { ServiceCreateDto } from './dto/service-create.dto';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {
  async createService(service: ServiceCreateDto, user) {
    const { Name, Description, Img } = service;

    const createdService = new Service();

    try {
      createdService.Name = Name;
      createdService.Description = Description;
      createdService.Img = Img;
      createdService.CreatedBy = user.Id;
      await createdService.save();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }

    return { Message: 'Service Created', Status: 200 };
  }
}
