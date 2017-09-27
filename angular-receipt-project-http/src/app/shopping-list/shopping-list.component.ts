/**
 * This is Shopping List component
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as fromApp from '../store/app.reducers';

/* tslint:disable:indent */
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
	// ingredients: Ingredient[];
  ingredients$: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private shoppingListService: ShoppingListService,
    // private store: Store<{shoppingList: {ingredients: Ingredient[]}}>,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
		// this.ingredients = this.shoppingListService.getIngredients();
    this.ingredients$ = this.store.select('shoppingList');
		// this.myObservableSubscription = this.shoppingListService.ingredientsChanged.subscribe(
		// 	(ingredients: Ingredient[]) => {
		// 		this.ingredients = ingredients;
		// 	}
		// );
	}

  /**
   * @see ngrx store, this.store.select('shoppingList')
   * No using this.myObservableSubscription anymore.
   */
	ngOnDestroy() {
    if (this.myObservableSubscription) {
      this.myObservableSubscription.unsubscribe();
    }
	}

	// onIngredientAdded(ingredient: Ingredient) {
	// 	this.ingredients.push(ingredient);
	// }

	/**
	 * Start to emit event
	 */
	onEditItem(index: number): void {
		// this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
	}

}
