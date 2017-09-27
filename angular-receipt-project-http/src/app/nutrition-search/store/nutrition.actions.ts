import { Action } from '@ngrx/store';

export const GET_NUTRITION_FACTS = 'GET_NUTRITION_FACTS';
export const ACQUIRED_NUTRITION_FACTS = 'ACQUIRED_NUTRITION_FACTS';

export class GetNutritionFactsAction implements Action {
  readonly type = GET_NUTRITION_FACTS;
  constructor(public payload: string) {}
}

export class AcquiredNutritionFactsAction implements Action {
  readonly type = ACQUIRED_NUTRITION_FACTS;
  constructor(public payload: Object) {}
}

export type NutritionActions = GetNutritionFactsAction | AcquiredNutritionFactsAction;
