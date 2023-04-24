/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import {
  AnimalCreateDto,
  AnimalResponseDto,
  AnimalUpdateDto,
} from './dtos/animal.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { query } from 'express';
import { AnimalQueryDto } from './dtos/animal-query.dto';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}
  @ApiResponse({
    status: 200,
    description: 'All animals in the zoo',
  })
  @Get()
  getAllAnimals(@Query() query: AnimalQueryDto): Promise<AnimalResponseDto[]> {
    return this.animalsService.getAllAnimals(query);
  }

  @ApiResponse({
    status: 200,
    description: 'Found animal by ID',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No animal found with that ID',
  })
  @Get(':id')
  getAnimalById(@Param('id') id: string): Promise<AnimalResponseDto> {
    return this.animalsService.getAnimal(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    status: 201,
    description: 'The added animal',
  })
  addNewAnimal(@Body() animal: AnimalCreateDto): Promise<AnimalResponseDto> {
    return this.animalsService.addNewAnimal(animal);
  }

  @ApiResponse({
    status: 200,
    description: 'The animal data has been updated',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The specified animal has not been found',
  })
  @Put(':id')
  @UsePipes(ValidationPipe)
  editAnimal(
    @Param('id') id: string,
    @Body() updateData: AnimalUpdateDto,
  ): Promise<AnimalResponseDto> {
    return this.animalsService.editAnimal(id, updateData);
  }

  @ApiResponse({
    status: 200,
    description: 'Animal successfully deleted',
  })
  @Delete(':id')
  deleteAnimal(@Param('id') id: string): Promise<AnimalResponseDto> {
    return this.animalsService.deleteAnimal(id);
  }
}
