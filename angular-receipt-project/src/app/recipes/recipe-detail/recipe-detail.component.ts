/**
 *
 */
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

	//@Input() recipe: Recipe;
	recipe: Recipe;
	id: number;
	private paramsSubscription: Subscription;

  constructor(
		private recipeService: RecipeService,
		private activatedRoute: ActivatedRoute,
		private router: Router) { }

  ngOnInit() {
		this.paramsSubscription = this.activatedRoute.params.subscribe(
			(params: Params) => {
				this.id = +params['id'];
				this.recipe = this.recipeService.getRecipe(this.id);
			}
		);
	}

	ngOnDestroy() {
		this.paramsSubscription.unsubscribe();
	}

	onAddToShoppingList() {
		this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
	}

	onEditRecipe() {
		this.router.navigate(['../', this.id, 'edit'], {
			relativeTo: this.activatedRoute
		})
	}

	onDeleteRecipe() {
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate(['/recipes']);
	}

}
