import { Module } from '@nestjs/common';
import { ServicController } from './servic.controller';
import { ServicService } from './servic.service';

@Module({
  controllers: [ServicController],
  providers: [ServicService]
})
export class ServicModule {}
