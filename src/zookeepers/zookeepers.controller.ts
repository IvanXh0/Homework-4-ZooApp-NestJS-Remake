import { AnimalResponseDto } from 'src/animals/dtos/animal.dto';
import {
  AssignAnimalDto,
  ZookeeperCreateDto,
  ZookeeperResponseDto,
  ZookeeperUpdateDto,
} from './dtos/zookeeper.dto';
import { ZookeepersService } from './zookeepers.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZookeeperQueryDto } from './dtos/zookeeper-query.dto';

@ApiTags('Zookeepers')
@Controller('zookeepers')
export class ZookeepersController {
  constructor(private readonly zookeepersService: ZookeepersService) {}

  @ApiResponse({
    status: 200,
    description: 'All zookeepers in the zoo',
  })
  @Get()
  getAllZookeepers(
    @Query() query: ZookeeperQueryDto,
  ): Promise<ZookeeperResponseDto[]> {
    return this.zookeepersService.getAllZookeepers(query);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    status: 201,
    description: 'The added zookeeper',
  })
  addNewZookeeper(
    @Body() zookeeper: ZookeeperCreateDto,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeepersService.addNewZookeeper(zookeeper);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found zookeeper',
  })
  getZookeeperById(@Param('id') id: string): Promise<ZookeeperResponseDto> {
    return this.zookeepersService.getZookeeper(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The zookeeper data has been updated',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The specified zookeeper has not been found',
  })
  @Put(':id')
  @UsePipes(ValidationPipe)
  editZookeeper(
    @Param('id') id: string,
    @Body() updateData: ZookeeperUpdateDto,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeepersService.editZookeeper(id, updateData);
  }

  @ApiResponse({
    status: 200,
    description: 'Zookeeper successfully deleted',
  })
  @Delete(':id')
  deleteZookeeper(@Param('id') id: string): Promise<ZookeeperResponseDto> {
    return this.zookeepersService.deleteZookeeper(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Animal(s) successfully assigned to zookeeper',
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Patch(':id/animals')
  assignAnimal(
    @Param('id') id: string,
    @Body() animalIds: AssignAnimalDto,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeepersService.assignAnimal(id, animalIds.animalIds);
  }
}
