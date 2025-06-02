import { ApiProperty } from '@nestjs/swagger';

export class RecipeResponseDto {
  @ApiProperty({
    description: 'ID único da receita',
    example: 'b8c4e2f1-4d3a-4b5c-9f8e-1a2b3c4d5e6f',
  })
  id: string;

  @ApiProperty({
    description: 'Título da receita',
    example: 'Bolo de Cenoura',
  })
  title: string;

  @ApiProperty({
    description: 'Descrição da receita',
    example: 'Um delicioso bolo de cenoura com cobertura de chocolate',
  })
  description: string;

  @ApiProperty({
    description: 'Lista de ingredientes',
    example: ['cenoura', 'açúcar', 'farinha', 'ovos'],
    type: [String],
  })
  ingredients: string[];

  @ApiProperty({
    description: 'Data de criação da receita',
    example: '2024-01-01T12:00:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2024-01-01T12:00:00.000Z',
  })
  updatedAt: string;
}