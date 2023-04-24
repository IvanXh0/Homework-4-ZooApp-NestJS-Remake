/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Animal } from './interaces/animal';
import {
  AnimalCreateDto,
  AnimalResponseDto,
  AnimalUpdateDto,
} from './dtos/animal.dto';
import { AnimalQueryDto } from './dtos/animal-query.dto';

@Injectable()
export class AnimalsService {
  constructor(@Inject('ANIMAL_MODEL') private animalModel: Model<Animal>) {}

  getAllAnimals(query: AnimalQueryDto): Promise<AnimalResponseDto[]> {
    return this.animalModel
      .find({
        location: { $regex: query?.location ?? '', $options: 'i' },
        gender: { $regex: query?.gender ?? '', $options: 'i' },
        age: { $gte: query?.age ?? 1 },
      })
      .populate('zookeeper');
  }

  getAnimal(id: string): Promise<AnimalResponseDto> {
    const animal = this.animalModel.findById(id).populate('zookeeper');

    if (!animal) {
      throw new NotFoundException(`The animal with ${id} id is not found`);
    }

    return animal;
  }

  addNewAnimal(animal: AnimalCreateDto): Promise<AnimalResponseDto> {
    return this.animalModel.create(animal);
  }

  async getAnimalModel(id: string): Promise<Animal> {
    const animalModel = await this.animalModel.findById(id);

    if (!animalModel) {
      throw new NotFoundException(`Animal with id ${id} not found`);
    }

    return animalModel;
  }

  async editAnimal(id: string, updateData: any): Promise<AnimalResponseDto> {
    const animal = (await this.getAnimalModel(id)) as Animal &
      mongoose.Document;

    if (!animal) {
      throw new NotFoundException(`The animal with ${id} id is not found`);
    }

    const keys = Object.keys(updateData);

    keys.forEach((key) => {
      if (key !== '_id' && key !== '__v') {
        animal[key] = updateData[key];
      }
    });

    const updatedAnimal = await animal.save();
    return updatedAnimal;
  }

  deleteAnimal(id: string): Promise<AnimalResponseDto> {
    return this.animalModel.findByIdAndDelete(id);
  }
}
