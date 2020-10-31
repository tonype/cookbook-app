import { Ingredient } from '@ingredients.models';
import { Tag } from '@tags.models';
import { Unit } from '@units.models';

interface RecipeIngredient {
  qty: number;
  unit: Unit;
  details: Ingredient;
}

interface RecipeDirection {
  step: number;
  detail: string;
}

export interface Recipe {
  _id: string;
  name: string;
  prepTime: number;
  cookTime: number;
  description: string;
  notes: string;
  foundFrom: string;
  tags: Tag[];
  ingredients: RecipeIngredient[];
  directions: RecipeDirection[];
  createdOn: number;
}
