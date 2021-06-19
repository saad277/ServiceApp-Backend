import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicController } from './servic.controller';
import { ServicService } from './servic.service';
import { ServiceRepository } from './service.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRepository])],
  controllers: [ServicController],
  providers: [ServicService],
})
export class ServicModule {}
