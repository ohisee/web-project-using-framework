/**
 * This is data storage service
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service'
import { dataHttpUrl } from './references';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import 'rxjs';

@Injectable()
export class DataStorageService {

	constructor(
		private http: Http,
		private recipeService: RecipeService,
		private authService: AuthService) { }

	storeRecipes() {
		const token = this.authService.getToken();
		return this.http.put(dataHttpUrl+"?auth="+token, this.recipeService.getRecipes());
	}

	getRecipes() {
		const token = this.authService.getToken();
		this.http.get(dataHttpUrl+"?auth="+token).map(
			(response: Response) => {
				const recipes: Recipe[] = response.json();
				if (recipes != null) {
					for (let recipe of recipes) {
						if (recipe.ingredients == null) {
							recipe.ingredients = [];
						}
					}
				}
				return recipes;
			}
		).subscribe(
			(recipes: Recipe[]) => {
				this.recipeService.setRecipes(recipes);
			}
		)
	}

}
