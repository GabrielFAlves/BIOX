import { Injectable } from '@nestjs/common';
import { Recipe } from '../../domain/entities/recipe.entity';
import { RecipeRepository } from '../../domain/repositories/recipe.repository';

export interface CreateRecipeRequest {
  title: string;
  description: string;
  ingredients: string[];
}

@Injectable()
export class CreateRecipeUseCase {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(request: CreateRecipeRequest): Promise<Recipe> {
    const recipe = new Recipe({
      title: request.title,
      description: request.description,
      ingredients: request.ingredients,
    });

    return await this.recipeRepository.create(recipe);
  }
}