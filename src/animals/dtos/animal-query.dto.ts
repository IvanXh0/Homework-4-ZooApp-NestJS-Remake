import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum QueryGender {
  M = 'm',
  F = 'f',
}

export class AnimalQueryDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    example: 'Skopje',
  })
  location?: string;

  @IsEnum(QueryGender)
  @IsOptional()
  @ApiPropertyOptional({
    type: 'enum',
    enum: QueryGender,
    example: QueryGender.M,
    description: 'The gender of the animal',
  })
  gender?: QueryGender;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
    example: 5,
  })
  age?: number;
}
