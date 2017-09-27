import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs/Subscription';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';

/* tslint:disable:indent */
@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

	@ViewChild('nameInput') nameInputRef: ElementRef;
	@ViewChild('amountInput') amountInputRef: ElementRef;
	@ViewChild('shoppingEditForm') shoppingEditForm: NgForm;

	// @Output() ingredientAdded = new EventEmitter<Ingredient>();

	private myObservableSubscription: Subscription;
	editMode: boolean = false;
	private editedItem: Ingredient;
	private editedItemIndex: number = 0;

	constructor(
		private shoppingListService: ShoppingListService,
		// private store: Store<{shoppingList: {ingredients: Ingredient[]}}>,
		// private store: Store<fromShoppingList.AppState>
		private store: Store<fromApp.AppState>) { }

	ngOnInit() {
		this.myObservableSubscription = this.store.select('shoppingList').subscribe(
			(data) => {
				if (data.editedIngredientIndex > -1) {
					this.editedItem = data.editedIngredient;
					this.editMode = true;
					this.shoppingEditForm.setValue({
						'name': this.editedItem.name,
						'amount': this.editedItem.amount
					});
				} else {
					this.editMode = false;
				}
			}
		);
		// this.myObservableSubscription = this.shoppingListService.startedEditing.subscribe(
		// (index: number) => {
		// this.editMode = true;
		// this.editedItemIndex = index;
		// this.editedItem = this.shoppingListService.getIngredient(index);
		// this.shoppingEditForm.setValue({
		// 'name': this.editedItem.name,
		// 'amount': this.editedItem.amount
		// });
		// }
		// );
	}

	ngOnDestroy() {
		this.store.dispatch(new ShoppingListActions.StopEdit());
		this.myObservableSubscription.unsubscribe();
	}

	/**
	 * Submit form
	 */
	onSubmit(form: NgForm): void {
		const value = form.value;
		const newIngredient = new Ingredient(value.name, value.amount);
		if (this.editMode) {
			// this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
			this.store.dispatch(new ShoppingListActions.UpdateIngredient({ ingredient: newIngredient }));
		} else {
			// this.shoppingListService.addIngredient(newIngredient);
			this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
		}
		this.editMode = false;
		form.reset();
	}

	onClear(): void {
		this.editMode = false;
		this.shoppingEditForm.reset();
	}

	onDelete(): void {
		this.onClear();
		// this.shoppingListService.deleteIngredient(this.editedItemIndex);
		this.store.dispatch(new ShoppingListActions.DeleteIngredient());
	}

	/**
	 * Emit event to shopping list component
	 */
	onAddItemUsingEmitEvent() {
		const ingreName = this.nameInputRef.nativeElement.value;
		const ingreAmount = this.amountInputRef.nativeElement.value;
		const newIngredient = new Ingredient(ingreName, ingreAmount);
		// this.ingredientAdded.emit(newIngredient);
		this.shoppingListService.addIngredient(newIngredient);
	}

}
