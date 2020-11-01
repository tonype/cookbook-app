import { Ingredient } from '@ingredients.models';
import { Tag } from '@tags.models';
import { Unit } from '@units.models';

export interface RecipeIngredient {
  _id: string;
  qty: number;
  unit: Unit | string;
  details: Ingredient | string;
}

export interface RecipeDirection {
  _id: string;
  step: number;
  detail: string;
}

export interface Recipe {
  _id: string;
  name: string;
  prepTime: number;
  cookTime: number;
  description: string;
  notes?: string;
  foundFrom?: string;
  tags: Tag[] | string[];
  ingredients: RecipeIngredient[];
  directions: RecipeDirection[];
  createdOn: number;
}
