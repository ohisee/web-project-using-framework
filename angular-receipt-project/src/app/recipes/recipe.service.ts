/**
 *
 */
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service'

@Injectable()
export class RecipeService {

	//public recipeSelected = new EventEmitter<Recipe>();

	recipeChanged = new Subject<Recipe[]>();

	private recipes: Recipe[] = [
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
	];

	constructor(private shoppingListService : ShoppingListService) {}

	/**
	 * Set / replace by incoming recipes
	 */
	setRecipes(recipes: Recipe[]) {
		if (recipes != null && recipes.length > 0) {
			this.recipes = recipes;
			this.recipeChanged.next(this.recipes.slice());
		}
	}

	/**
	 * Return a shallow copy using slice method
	 */
	getRecipes(): Recipe[] {
		return this.recipes.slice();
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}

	/**
	 * Return a recipe by index
	 * @param number
	 */
	getRecipe(index: number): Recipe {
		if (index >= 0 && index < this.recipes.length) {
			return this.recipes.slice()[index];
		} else {
			return this.recipes.slice()[0];
		}
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipeChanged.next(this.recipes.slice());
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		if (index >= 0 && index < this.recipes.length) {
			this.recipes[index] = newRecipe;
		}
		this.recipeChanged.next(this.recipes.slice());
	}

	deleteRecipe(index: number) {
		if (index >= 0 && index < this.recipes.length) {
			this.recipes.splice(index, 1);
		}
		this.recipeChanged.next(this.recipes.slice());
	}

}
