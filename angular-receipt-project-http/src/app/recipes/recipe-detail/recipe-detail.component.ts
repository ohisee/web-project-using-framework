/**
 *
 */
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

/* tslint:disable:indent */
@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

	// @Input() recipe: Recipe;
	recipe: Recipe;
	id: number;
	recipeState$: Observable<fromRecipe.State>;
	private paramsSubscription: Subscription;

	constructor(
		private recipeService: RecipeService,
		private activatedRoute: ActivatedRoute,
		private router: Router, private store: Store<fromRecipe.FeatureState>) { }

	ngOnInit() {
		this.paramsSubscription = this.activatedRoute.params.subscribe(
			(params: Params) => {
				this.id = +params['id'];
				// this.recipe = this.recipeService.getRecipe(this.id);
				this.store.select('recipes')
					.take(1)
					.subscribe((recipeState: fromRecipe.State) => {
						this.recipe = recipeState.recipes[this.id];
					});
			}
		);
		console.log('recipe detail');
	}

	ngOnDestroy() {
		this.paramsSubscription.unsubscribe();
	}

	onAddToShoppingList() {
		this.store.select('recipes').take(1).subscribe((recipeState: fromRecipe.State) => {
			const ingredients = recipeState.recipes[this.id].ingredients;
			if (ingredients && ingredients.length > 0) {
				this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
			}
		});
		// this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
		// if (this.recipe.ingredients != null && this.recipe.ingredients.length > 0) {
		// 	this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
		// }
	}

	onEditRecipe() {
		this.router.navigate(['../', this.id, 'edit'], {
			relativeTo: this.activatedRoute
		});
	}

	onDeleteRecipe() {
		// this.recipeService.deleteRecipe(this.id);
		this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
		this.router.navigate(['/recipes']);
	}

}
