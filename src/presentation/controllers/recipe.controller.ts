import { 
  Controller, 
  Post, 
  Get, 
  Param, 
  Body, 
  HttpStatus, 
  HttpCode,
  ParseUUIDPipe 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiBody 
} from '@nestjs/swagger';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { RecipeResponseDto } from '../dtos/recipe-response.dto';
import { CreateRecipeUseCase } from '../../application/use-cases/create-recipe.use-case';
import { ListAllRecipesUseCase } from '../../application/use-cases/list-all-recipes.use-case';
import { GetRecipeByIdUseCase } from '../../application/use-cases/get-recipe-by-id.use-case';
import { RecipePresenter } from '../presenters/recipe.presenter';

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly listAllRecipesUseCase: ListAllRecipesUseCase,
    private readonly getRecipeByIdUseCase: GetRecipeByIdUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Criar nova receita',
    description: 'Cria uma nova receita no catálogo com título, descrição e ingredientes' 
  })
  @ApiBody({ type: CreateRecipeDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Receita criada com sucesso',
    type: RecipeResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos fornecidos' 
  })
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<RecipeResponseDto> {
    const recipe = await this.createRecipeUseCase.execute(createRecipeDto);
    return RecipePresenter.toHTTP(recipe);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar todas as receitas',
    description: 'Retorna uma lista com todas as receitas cadastradas no catálogo' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de receitas retornada com sucesso',
    type: [RecipeResponseDto] 
  })
  async findAll(): Promise<RecipeResponseDto[]> {
    const recipes = await this.listAllRecipesUseCase.execute();
    return RecipePresenter.toHTTPList(recipes);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar receita por ID',
    description: 'Retorna uma receita específica baseada no ID fornecido' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único da receita',
    example: 'b8c4e2f1-4d3a-4b5c-9f8e-1a2b3c4d5e6f' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Receita encontrada com sucesso',
    type: RecipeResponseDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Receita não encontrada' 
  })
  async findById(@Param('id') id: string): Promise<RecipeResponseDto> {
    const recipe = await this.getRecipeByIdUseCase.execute(id);
    return RecipePresenter.toHTTP(recipe);
  }
}