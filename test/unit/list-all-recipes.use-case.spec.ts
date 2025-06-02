import { ListAllRecipesUseCase } from '../../src/application/use-cases/list-all-recipes.use-case';
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

describe('ListAllRecipesUseCase', () => {
  let useCase: ListAllRecipesUseCase;
  let repository: MockRecipeRepository;

  beforeEach(() => {
    repository = new MockRecipeRepository();
    useCase = new ListAllRecipesUseCase(repository);
  });

  describe('execute', () => {
    it('should return empty array when no recipes exist', async () => {
      const result = await useCase.execute();

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return all recipes when recipes exist', async () => {
      const recipe1 = new Recipe({
        title: 'Receita 1',
        description: 'Descrição 1',
        ingredients: ['ingrediente1', 'ingrediente2'],
      });
      const recipe2 = new Recipe({
        title: 'Receita 2',
        description: 'Descrição 2',
        ingredients: ['ingrediente3', 'ingrediente4'],
      });

      await repository.create(recipe1);
      await repository.create(recipe2);

      const result = await useCase.execute();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(recipe1);
      expect(result[1]).toEqual(recipe2);
    });

    it('should call repository findAll method', async () => {
      const repositorySpy = jest.spyOn(repository, 'findAll');

      await useCase.execute();

      expect(repositorySpy).toHaveBeenCalledTimes(1);
      expect(repositorySpy).toHaveBeenCalledWith();
    });

    it('should return recipes in insertion order', async () => {
      const firstRecipe = new Recipe({
        title: 'Primeira Receita',
        description: 'Primeira descrição',
        ingredients: ['primeiro'],
      });
      const secondRecipe = new Recipe({
        title: 'Segunda Receita',
        description: 'Segunda descrição',
        ingredients: ['segundo'],
      });

      await repository.create(firstRecipe);
      await repository.create(secondRecipe);

      const result = await useCase.execute();

      expect(result[0].title).toBe('Primeira Receita');
      expect(result[1].title).toBe('Segunda Receita');
    });

    it('should return recipes with all properties', async () => {
      const recipe = new Recipe({
        title: 'Brigadeiro',
        description: 'Doce brasileiro clássico',
        ingredients: ['leite condensado', 'chocolate', 'manteiga'],
      });

      await repository.create(recipe);
      const result = await useCase.execute();

      expect(result[0]).toEqual(recipe);
      expect(result[0].id).toBeDefined();
      expect(result[0].title).toBe('Brigadeiro');
      expect(result[0].description).toBe('Doce brasileiro clássico');
      expect(result[0].ingredients).toEqual(['leite condensado', 'chocolate', 'manteiga']);
      expect(result[0].createdAt).toBeInstanceOf(Date);
      expect(result[0].updatedAt).toBeInstanceOf(Date);
    });

    it('should handle multiple recipes with different timestamps', async () => {
      const recipe1 = new Recipe({
        title: 'Receita Antiga',
        description: 'Descrição antiga',
        ingredients: ['ingrediente1'],
      });

      await repository.create(recipe1);

      // Simular uma pequena diferença de tempo
      await new Promise(resolve => setTimeout(resolve, 10));

      const recipe2 = new Recipe({
        title: 'Receita Nova',
        description: 'Descrição nova',
        ingredients: ['ingrediente2'],
      });

      await repository.create(recipe2);
      const result = await useCase.execute();

      expect(result).toHaveLength(2);
      expect(result[0].createdAt.getTime()).toBeLessThanOrEqual(result[1].createdAt.getTime());
    });
  });
});