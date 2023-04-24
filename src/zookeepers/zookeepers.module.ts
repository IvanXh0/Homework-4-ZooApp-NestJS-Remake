import { ZookeepersService } from './zookeepers.service';
import { ZookeepersController } from './zookeepers.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { zookeeperProviders } from './zookeepers.providers';
import { AnimalsModule } from 'src/animals/animals.module';
/*
https://docs.nestjs.com/modules
*/

@Module({
  imports: [DatabaseModule, AnimalsModule],
  controllers: [ZookeepersController],
  providers: [ZookeepersService, ...zookeeperProviders],
})
export class ZookeepersModule {}
