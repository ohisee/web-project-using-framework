import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { dataHttpUrl } from '../../shared/references';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Injectable()
export class RecipeEffects {

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>) { }

  @Effect() recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap(
      (action: RecipeActions.FetchRecipes) => {
        return this.store.select('auth').take(1).map(
          (state: fromAuth.State) => {
            return state.token;
          }
        );
      },
      (action: RecipeActions.FetchRecipes, token: string, outer, inner) => {
        return this.httpClient.get(dataHttpUrl, {
          observe: 'body',
          responseType: 'json',
          params: new HttpParams().append('auth', token)
        }).catch((error) => {
          return Observable.of(false);
        });
      }
    ).switchMap((observableRes) => {
      return observableRes.map((response) => {
        if (response) {
          return <Recipe[]>response;
        }
        return null;
      });
    }).map((recipes) => {
      if (recipes != null) {
        for (const recipe of recipes) {
          if (recipe.ingredients == null) {
            recipe.ingredients = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
      return {
        type: RecipeActions.ERRORED
      };
    });

  @Effect({ dispatch: false }) recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('auth'))
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([[action, authState], recipeState]) => {
      const req = new HttpRequest('PUT', dataHttpUrl, recipeState.recipes, {
        params: new HttpParams().append('auth', authState.token),
        reportProgress: true
      });
      return this.httpClient.request(req);
    });

}
