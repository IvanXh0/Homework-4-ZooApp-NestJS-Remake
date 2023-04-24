import { AnimalsModule } from './animals/animals.module';
import { ConfigModule } from '@nestjs/config';
import { ZookeepersModule } from './zookeepers/zookeepers.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AnimalsModule, ZookeepersModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
