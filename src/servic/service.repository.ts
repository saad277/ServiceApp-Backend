import { Repository, EntityRepository } from 'typeorm';
import { Service } from '../entities/service.schema.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

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

  async getServiceDetails(id: number, user) {
    const service = await this.findOne(id);

    if (service) {
      if (service.CreatedBy === user.Id) {
        return service;
      }
      throw new UnauthorizedException();
    }

    throw new NotFoundException();
  }

  async deleteService(id: number, user) {
    const isExists = await this.getServiceDetails(id, user);

    if (isExists) {
      try {
        const result = await this.delete(id);

        return { Message: 'Service Deleted Successfully' };
      } catch (err) {
        throw new InternalServerErrorException();
      }
    }
  }
}
