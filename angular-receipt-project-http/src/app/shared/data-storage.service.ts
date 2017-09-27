/**
 * This is data storage service
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { dataHttpUrl } from './references';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import 'rxjs/Rx';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

/* tslint:disable:indent */
@Injectable()
export class DataStorageService {

	constructor(
		private http: Http,
		private recipeService: RecipeService,
		// private authService: AuthService,
		private store: Store<fromApp.AppState>) { }

	storeRecipes() {
		// const token = this.authService.getToken();
		return this.store.select('auth').switchMap(
			(authState: fromAuth.State) => {
				return this.http.put(dataHttpUrl + '?auth=' + authState.token, this.recipeService.getRecipes());
			}
		);
	}

	getRecipes() {
		// const token = this.authService.getToken();
		this.store.select('auth').switchMap(
			(authState: fromAuth.State) => {
				return this.http.get(dataHttpUrl + '?auth=' + authState.token).map(
					(response: Response) => {
						const recipes: Recipe[] = response.json();
						if (recipes != null) {
							for (const recipe of recipes) {
								if (recipe.ingredients == null) {
									recipe.ingredients = [];
								}
							}
						}
						return recipes;
					}
				);
			}
		).subscribe(
			(recipes: Recipe[]) => {
				this.recipeService.setRecipes(recipes);
			}
		);
	}

}
