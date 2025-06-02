import { Recipe } from '../../domain/entities/recipe.entity';

export class RecipePresenter {
  static toHTTP(recipe: Recipe) {
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      createdAt: recipe.createdAt.toISOString(),
      updatedAt: recipe.updatedAt.toISOString(),
    };
  }

  static toHTTPList(recipes: Recipe[]) {
    return recipes.map(recipe => this.toHTTP(recipe));
  }
}