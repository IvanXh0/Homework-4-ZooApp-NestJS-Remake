import { AnimalsService } from './../animals/animals.service';
import { query } from 'express';
/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Zookeeper } from './interfaces/zookeeper';
import {
  ZookeeperCreateDto,
  ZookeeperResponseDto,
  ZookeeperUpdateDto,
} from './dtos/zookeeper.dto';
import { ZookeeperQueryDto } from './dtos/zookeeper-query.dto';

@Injectable()
export class ZookeepersService {
  constructor(
    @Inject('ZOOKEEPER_MODEL') private zookeeperModel: Model<Zookeeper>,
    private readonly animalsService: AnimalsService,
  ) {}

  getAllZookeepers(query: ZookeeperQueryDto): Promise<ZookeeperResponseDto[]> {
    return this.zookeeperModel
      .find({
        location: { $regex: query?.location ?? '', $options: 'i' },
        age: { $gte: query?.age ?? 1 },
        isActive: query?.isActive ?? true,
        name: { $regex: query?.name ?? '', $options: 'i' },
      })
      .populate('animals');
  }

  getZookeeper(id: string): Promise<ZookeeperResponseDto> {
    return this.zookeeperModel.findById(id).populate('animals');
  }

  addNewZookeeper(
    zookeeper: ZookeeperCreateDto,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeeperModel.create(zookeeper);
  }

  async editZookeeper(
    id: string,
    updateData: ZookeeperUpdateDto,
  ): Promise<ZookeeperResponseDto> {
    const zookeeper = await this.getZookeeper(id);

    if (!zookeeper) {
      throw new NotFoundException(`The zookeeper with ${id} id is not found`);
    }

    return this.zookeeperModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  deleteZookeeper(id: string): Promise<ZookeeperResponseDto> {
    return this.zookeeperModel.findByIdAndDelete(id);
  }

  async getZookeeperModel(id: string): Promise<Zookeeper> {
    const zookeeperModel = await this.zookeeperModel.findById(id);

    if (!zookeeperModel) {
      throw new NotFoundException(`Zookeeper with id ${id} not found`);
    }

    return zookeeperModel;
  }

  async assignAnimal(
    zookeeperId: string,
    animalIds: string[],
  ): Promise<ZookeeperResponseDto> {
    const zookeeper = (await this.getZookeeperModel(zookeeperId)) as Zookeeper &
      mongoose.Document;

    if (!zookeeper) {
      throw new NotFoundException(
        `The zookeeper with ${zookeeperId} id is not found`,
      );
    }

    zookeeper.animals = animalIds;

    for (const animalId of animalIds) {
      await this.animalsService.editAnimal(animalId, {
        zookeeper: zookeeperId,
      });
    }

    console.log(zookeeper);

    const updatedZookeeperModel = await zookeeper.save();

    const updatedZookeeper =
      updatedZookeeperModel.toObject() as ZookeeperResponseDto;

    return updatedZookeeper;
  }
}
