import { randomUUID } from 'crypto';

interface RecipeProps {
  id?: string;
  title: string;
  description: string;
  ingredients: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Recipe {
  private _id: string;
  private _title: string;
  private _description: string;
  private _ingredients: string[];
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: RecipeProps) {
    this._id = props.id || randomUUID();
    this._title = props.title;
    this._description = props.description;
    this._ingredients = props.ingredients;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get ingredients(): string[] {
    return this._ingredients;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}