import { Injectable } from '@nestjs/common';
import { RecipeRepository } from '../../domain/repositories/recipe.repository';
import { Recipe } from '../../domain/entities/recipe.entity';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class RecipePrismaRepository implements RecipeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(recipe: Recipe): Promise<Recipe> {
    const createdRecipe = await this.prisma.recipe.create({
      data: {
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
      },
    });

    return this.toDomain(createdRecipe);
  }

  async findAll(): Promise<Recipe[]> {
    const recipes = await this.prisma.recipe.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return recipes.map(recipe => this.toDomain(recipe));
  }

  async findById(id: string): Promise<Recipe | null> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    });

    return recipe ? this.toDomain(recipe) : null;
  }

  private toDomain(prismaRecipe: {
    id: string;
    title: string;
    description: string;
    ingredients: string[];
    createdAt: Date;
    updatedAt: Date;
  }): Recipe {
    return new Recipe({
      id: prismaRecipe.id,
      title: prismaRecipe.title,
      description: prismaRecipe.description,
      ingredients: prismaRecipe.ingredients,
      createdAt: prismaRecipe.createdAt,
      updatedAt: prismaRecipe.updatedAt,
    });
  }
}