/**
 * This is Shopping List component
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

	// ingredients: Ingredient[] = [
	// 	new Ingredient('Apples', 5),
	// 	new Ingredient('Tomatoes', 10),
	// ];

	private myObservableSubscription: Subscription;
	ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
		this.ingredients = this.shoppingListService.getIngredients();
		this.myObservableSubscription = this.shoppingListService.ingredientsChanged.subscribe(
			(ingredients: Ingredient[]) => {
				this.ingredients = ingredients;
			}
		);
	}

	ngOnDestroy() {
		this.myObservableSubscription.unsubscribe();
	}

	// onIngredientAdded(ingredient: Ingredient) {
	// 	this.ingredients.push(ingredient);
	// }

	/**
	 * Start to emit event
	 */
	onEditItem(index: number): void {
		this.shoppingListService.startedEditing.next(index);
	}

}
