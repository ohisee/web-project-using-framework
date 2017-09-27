import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromAppState from '../../store/app.reducers';

export interface State {
  recipes: Recipe[];
}

export interface FeatureState extends fromAppState.AppState {
  recipes: State;
}

const initialState: State = {
  recipes: [
    new Recipe(
      'A Test Recipe',
      'The best chicken recipes for the whole chicken',
      'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Another Test Recipe',
      'Unite a trio of colorful peppers with marinated chicken for these Chicken Kabobs on the Grill',
      'http://www.seriouseats.com/recipes/assets_c/2017/03/Kimchi_Pancakes_Shrimp_20170320_3-edit-thumb-1500xauto-436992.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('French Fries', 30)
      ]),
    new Recipe(
      'Chicken Massaman Curry',
      'This chicken massaman curry brings bold spices, flavors, and colors...without an unbearable level of heat.',
      'http://www.seriouseats.com/recipes/assets_c/2017/03/20170210-chicken-massaman-emily-matt-clifton-4-thumb-1500xauto-436790.jpg'
    )
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case (RecipeActions.UPDATE_RECIPE):
      const recipeToBeUpdated = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipeToBeUpdated,
        ...action.payload.updatedRecipe
      };
      const allRecipes = [...state.recipes];
      allRecipes[action.payload.index] = <Recipe>updatedRecipe;
      return {
        ...state,
        recipes: allRecipes
      };
    case (RecipeActions.DELETE_RECIPE):
      const allExistingRecipes = [...state.recipes];
      allExistingRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: allExistingRecipes
      };
    case (RecipeActions.ERRORED):
      return {
        ...state
      };
    default:
      return state;
  }
}
