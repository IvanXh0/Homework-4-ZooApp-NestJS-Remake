import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { Zookeeper } from '../interfaces/zookeeper';

export class ZookeeperCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The name of the zookeeper',
    example: 'Ivan',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({
    type: Number,
    description: 'The age of the zookeeper',
    example: 18,
  })
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The location of the zookeeper',
    example: 'Skopje',
  })
  location: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: 'Is the zookeeper in service',
    example: true,
  })
  isActive: boolean;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    description: 'The animals assigned to the zookeeper',
    example: ['642eaceaf80a318583536a6f', '642eae6ab955b98189ba071a'],
  })
  animals: string[];
}

export class AssignAnimalDto {
  @ApiProperty({
    type: [String],
    description: 'List of animal IDs to assign to the zookeeper',
    example: ['642eaceaf80a318583536a6f', '642eae6ab955b98189ba071a'],
  })
  animalIds: string[];
}

export class ZookeeperResponseDto
  extends ZookeeperCreateDto
  implements Zookeeper
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The ID of the zookeeper',
    example: '64416a1d723b65ab35909e1d',
  })
  id: string;
}

export class ZookeeperUpdateDto extends ZookeeperCreateDto {}
