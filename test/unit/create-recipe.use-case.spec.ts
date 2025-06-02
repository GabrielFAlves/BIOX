import { CreateRecipeUseCase } from '../../src/application/use-cases/create-recipe.use-case';
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

describe('CreateRecipeUseCase', () => {
  let useCase: CreateRecipeUseCase;
  let repository: MockRecipeRepository;

  beforeEach(() => {
    repository = new MockRecipeRepository();
    useCase = new CreateRecipeUseCase(repository);
  });

  it('should create a recipe successfully', async () => {
    const request = {
      title: 'Bolo de Chocolate',
      description: 'Um delicioso bolo de chocolate',
      ingredients: ['chocolate', 'farinha', 'açúcar', 'ovos'],
    };

    const result = await useCase.execute(request);

    expect(result).toBeInstanceOf(Recipe);
    expect(result.title).toBe(request.title);
    expect(result.description).toBe(request.description);
    expect(result.ingredients).toEqual(request.ingredients);
    expect(result.id).toBeDefined();
    expect(typeof result.id).toBe('string');
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  it('should generate unique IDs for different recipes', async () => {
    const request1 = {
      title: 'Receita 1',
      description: 'Descrição 1',
      ingredients: ['ingrediente1'],
    };
    const request2 = {
      title: 'Receita 2',
      description: 'Descrição 2',
      ingredients: ['ingrediente2'],
    };

    const recipe1 = await useCase.execute(request1);
    const recipe2 = await useCase.execute(request2);

    expect(recipe1.id).not.toBe(recipe2.id);
  });

  it('should save recipe in repository', async () => {
    const request = {
      title: 'Torta de Maçã',
      description: 'Uma torta doce de maçã',
      ingredients: ['maçã', 'massa', 'açúcar'],
    };
    const repositorySpy = jest.spyOn(repository, 'create');

    const result = await useCase.execute(request);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledWith(expect.any(Recipe));

    const savedRecipe = repositorySpy.mock.calls[0][0];
    expect(savedRecipe.title).toBe(request.title);
    expect(savedRecipe.description).toBe(request.description);
    expect(savedRecipe.ingredients).toEqual(request.ingredients);
  });

  it('should set timestamps automatically', async () => {
    const request = {
      title: 'Pão de Açúcar',
      description: 'Pão doce caseiro',
      ingredients: ['farinha', 'açúcar', 'fermento'],
    };

    const beforeExecution = new Date();
    const result = await useCase.execute(request);
    const afterExecution = new Date();

    expect(result.createdAt.getTime()).toBeGreaterThanOrEqual(beforeExecution.getTime());
    expect(result.createdAt.getTime()).toBeLessThanOrEqual(afterExecution.getTime());
    expect(result.updatedAt.getTime()).toBeGreaterThanOrEqual(beforeExecution.getTime());
    expect(result.updatedAt.getTime()).toBeLessThanOrEqual(afterExecution.getTime());
  });
});