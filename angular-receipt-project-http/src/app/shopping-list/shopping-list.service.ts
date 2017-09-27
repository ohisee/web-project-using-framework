/**
 *
 */
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

/**
 * Subject has Observer and Observable in one object
 * Subject.next() push value
 * Subject.subscribe() to consume
 */
/* tslint:disable:indent */
export class ShoppingListService {

	// ingredientsChanged = new EventEmitter<Ingredient[]>();
	ingredientsChanged = new Subject<Ingredient[]>();
	startedEditing = new Subject<number>();

	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10),
	];

	getIngredients(): Ingredient[] {
		return this.ingredients.slice();
	}

	getIngredient(index: number): Ingredient {
		if (index >= 0 && index < this.ingredients.length) {
			return this.ingredients[index];
		} else {
			return this.ingredients[0];
		}
	}

	addIngredient(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
		// this.ingredientsChanged.emit(this.ingredients.slice());
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	addIngredients(ingredients: Ingredient[]) {
		this.ingredients.push(...ingredients);
		// this.ingredientsChanged.emit(this.ingredients.slice());
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	updateIngredient(index : number, newIngredient: Ingredient) {
		if (index >= 0 && index < this.ingredients.length) {
			this.ingredients[index] = newIngredient;
		}
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	deleteIngredient(index: number) {
		if (index >= 0 && index < this.ingredients.length) {
			this.ingredients.splice(index, 1);
		}
		this.ingredientsChanged.next(this.ingredients.slice());
	}

}
