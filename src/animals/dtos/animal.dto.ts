import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Animal } from '../interaces/animal';

export enum Enclosure {
  Mountain = 'mountain',
  Ice = 'ice',
  Water = 'water',
  Jungle = 'jungle',
  Desert = 'desert',
  Savana = 'savana',
  Ocean = 'ocean',
  Rainforest = 'rainforest',
}

export class Characteristics {
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    description: 'The types of food that the animal eats',
    example: ['meat', 'vegetables'],
  })
  food: string[];

  @IsString()
  @ApiProperty({
    type: String,
    description: 'The color of the animal',
    example: 'brown',
  })
  colour: string;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Whether the animal is dangerous or not',
    example: false,
  })
  isDangerous: boolean;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    type: Number,
    description: 'The weight of the animal',
    example: 150,
  })
  weight: number;

  @IsEnum(Enclosure)
  @ApiProperty({
    type: String,
    enum: Enclosure,
    description: 'The type of enclosure that the animal requires',
    example: 'jungle',
  })
  enclosure: Enclosure;
}

export class AnimalCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The name of the animal',
    example: 'Petko',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The type of the animal',
    example: 'Lion',
  })
  type: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({
    type: Number,
    description: 'The age of the animal',
    example: 3,
  })
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The location of the animal',
    example: 'Skopje',
  })
  location: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['M', 'F'])
  @ApiProperty({
    type: String,
    description: 'The gender of the animal',
    example: 'M',
  })
  gender: string;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({
    type: Characteristics,
  })
  characteristics: Characteristics;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Zookeeper assigned to the animal',
    example: '6433efd8f0a6598b83ad4b8a',
  })
  zookeeper: string;
}

export class AnimalResponseDto extends AnimalCreateDto implements Animal {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The id of the animal',
    example: '64416a1d723b65ab35909e1d',
  })
  id: string;
}

export class AnimalUpdateDto extends AnimalCreateDto {}
