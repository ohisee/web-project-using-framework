/**
 * This is Recipe List component
 */
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromReceipe from '../store/recipe.reducers';

/* tslint:disable:indent */
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

	// @Output() recipeWasSelected = new EventEmitter<Recipe>();

	recipes: Recipe[] = [];
	recipes$: Observable<fromReceipe.State>;
	private observableSubscription: Subscription;

  constructor(
		private recipeService: RecipeService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private store: Store<fromReceipe.FeatureState>) { }

  ngOnInit() {
		// this.recipes = this.recipeService.getRecipes();
		// this.observableSubscription = this.recipeService.recipeChanged.subscribe(
		// 	(recipes: Recipe[]) => {
		// 		this.recipes = recipes;
		// 	}
		// );
		this.recipes$ = this.store.select('recipes');
		console.log('recipe list');
	}

	ngOnDestroy() {
		if (this.observableSubscription) {
			this.observableSubscription.unsubscribe();
		}
	}

	/**
	 * On recipe selected emit event to recipes component
	 */
	// onRecipeSelected(recipe : Recipe) {
	// 	this.recipeWasSelected.emit(recipe);
	// }

	onNewRecipe() {
		this.router.navigate(['new'], {
			relativeTo: this.activatedRoute
		});
	}

}
