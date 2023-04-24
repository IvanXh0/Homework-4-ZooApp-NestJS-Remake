import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { animalProviders } from './animals.providers';
/*
https://docs.nestjs.com/modules
*/

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController],
  providers: [AnimalsService, ...animalProviders],
  exports: [AnimalsService],
})
export class AnimalsModule {}
