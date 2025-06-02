import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecipeController } from './presentation/controllers/recipe.controller';
import { CreateRecipeUseCase } from './application/use-cases/create-recipe.use-case';
import { ListAllRecipesUseCase } from './application/use-cases/list-all-recipes.use-case';
import { GetRecipeByIdUseCase } from './application/use-cases/get-recipe-by-id.use-case';
import { RecipeRepository } from './domain/repositories/recipe.repository';
import { RecipePrismaRepository } from './infrastructure/repositories/recipe-prisma.repository';
import { PrismaModule } from './infrastructure/database/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [RecipeController],
  providers: [
    CreateRecipeUseCase,
    ListAllRecipesUseCase,
    GetRecipeByIdUseCase,
    {
      provide: RecipeRepository,
      useClass: RecipePrismaRepository,
    },
  ],
})
export class AppModule {}