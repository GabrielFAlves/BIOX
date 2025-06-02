import { NotFoundException } from '@nestjs/common';
import { GetRecipeByIdUseCase } from '../../src/application/use-cases/get-recipe-by-id.use-case';
import { Recipe } from '../../src/domain/entities/recipe.entity';
import { RecipeRepository } from '../../src/domain/repositories/recipe.repository';

// Mock Repository para os testes
class MockRecipeRepository implements RecipeRepository {
  private recipes: Recipe[] = [];

  async create(recipe: Recipe): Promise<Recipe> {
    this.recipes.push(recipe);
    return recipe;
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipes;
  }

  async findById(id: string): Promise<Recipe | null> {
    return this.recipes.find(recipe => recipe.id === id) || null;
  }
}

describe('GetRecipeByIdUseCase', () => {
  let useCase: GetRecipeByIdUseCase;
  let repository: MockRecipeRepository;

  beforeEach(() => {
    repository = new MockRecipeRepository();
    useCase = new GetRecipeByIdUseCase(repository);
  });

  describe('execute', () => {
    it('should return recipe when found by id', async () => {
      const recipe = new Recipe({
        title: 'Lasanha',
        description: 'Lasanha italiana tradicional',
        ingredients: ['massa', 'molho', 'queijo', 'carne'],
      });
      await repository.create(recipe);

      const result = await useCase.execute(recipe.id);

      expect(result).toEqual(recipe);
      expect(result.id).toBe(recipe.id);
      expect(result.title).toBe(recipe.title);
    });

    it('should throw NotFoundException when recipe not found', async () => {
      const nonExistentId = 'non-existent-id';

      await expect(useCase.execute(nonExistentId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(useCase.execute(nonExistentId)).rejects.toThrow(
        `Recipe with ID ${nonExistentId} not found`,
      );
    });

    it('should call repository findById with correct id', async () => {
      const recipe = new Recipe({
        title: 'Pizza',
        description: 'Pizza margherita',
        ingredients: ['massa', 'molho', 'queijo', 'manjericão'],
      });
      await repository.create(recipe);
      const repositorySpy = jest.spyOn(repository, 'findById');

      await useCase.execute(recipe.id);

      expect(repositorySpy).toHaveBeenCalledTimes(1);
      expect(repositorySpy).toHaveBeenCalledWith(recipe.id);
    });

    it('should handle empty string id', async () => {
      await expect(useCase.execute('')).rejects.toThrow(NotFoundException);
      await expect(useCase.execute('')).rejects.toThrow(
        'Recipe with ID  not found',
      );
    });

    it('should handle null/undefined id gracefully', async () => {
      await expect(useCase.execute(null as any)).rejects.toThrow();
      await expect(useCase.execute(undefined as any)).rejects.toThrow();
    });

    it('should return recipe with correct timestamps', async () => {
      const recipe = new Recipe({
        title: 'Bolo de Cenoura',
        description: 'Bolo tradicional brasileiro',
        ingredients: ['cenoura', 'açúcar', 'farinha'],
      });
      await repository.create(recipe);

      const result = await useCase.execute(recipe.id);

      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
      expect(result.createdAt).toEqual(recipe.createdAt);
      expect(result.updatedAt).toEqual(recipe.updatedAt);
    });
  });
});