import { IsString, IsArray, IsNotEmpty, ArrayNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({
    description: 'Título da receita',
    example: 'Bolo de Cenoura',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Título deve ter pelo menos 3 caracteres' })
  @MaxLength(100, { message: 'Título deve ter no máximo 100 caracteres' })
  title: string;

  @ApiProperty({
    description: 'Descrição detalhada da receita',
    example: 'Um delicioso bolo de cenoura com cobertura de chocolate',
    minLength: 10,
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Descrição deve ter pelo menos 10 caracteres' })
  @MaxLength(500, { message: 'Descrição deve ter no máximo 500 caracteres' })
  description: string;

  @ApiProperty({
    description: 'Lista de ingredientes necessários',
    example: ['cenoura', 'açúcar', 'farinha', 'ovos', 'óleo'],
    type: [String],
    minItems: 1,
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'Deve ter pelo menos um ingrediente' })
  @IsString({ each: true, message: 'Cada ingrediente deve ser uma string' })
  ingredients: string[];
}