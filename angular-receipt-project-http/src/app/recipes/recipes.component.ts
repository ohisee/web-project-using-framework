/**
 * This is Recipe Component.
 */
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

/* tslint:disable:indent */
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
	// providers: [RecipeService] - add to app.module.ts
})
export class RecipesComponent implements OnInit {

	selectedRecipe: Recipe;

  // constructor(private recipeService: RecipeService) { }
	constructor() { }

  ngOnInit() {
		// this.recipeService.recipeSelected.subscribe(
		// 	(recipe: Recipe) => {
		// 		this.selectedRecipe = recipe;
		// 	}
		// );
	}

}
