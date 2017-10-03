/**
 * This is Recipe List component
 */
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

	//@Output() recipeWasSelected = new EventEmitter<Recipe>();

	recipes: Recipe[] = [];
	private observableSubscription: Subscription;

  constructor(
		private recipeService: RecipeService,
		private router: Router,
		private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
		this.recipes = this.recipeService.getRecipes();
		this.observableSubscription = this.recipeService.recipeChanged.subscribe(
			(recipes: Recipe[]) => {
				this.recipes = recipes;
			}
		)
	}

	ngOnDestroy() {
		this.observableSubscription.unsubscribe();
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
