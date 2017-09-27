import { ActionReducerMap } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromNutrition from '../nutrition-search/store/nutrition.reducers';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  nutritionFact: fromNutrition.State;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  nutritionFact: fromNutrition.NutritionReducers
};
