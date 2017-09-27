import * as NutritionActions from './nutrition.actions';

export interface State {
  itemId: string;
  nutritionFacts: Object;
}

const initialState: State = {
  itemId: null,
  nutritionFacts: null
};

export function NutritionReducers(state = initialState, action: NutritionActions.NutritionActions) {
  switch (action.type) {
    case (NutritionActions.ACQUIRED_NUTRITION_FACTS):
      return {
        ...state,
        nutritionFacts: action.payload
      };
    default:
      return state;
  }
}
