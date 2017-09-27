/**
 *
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

/* tslint:disable:indent */
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

	@Input() recipe: Recipe;
	@Input() index: number;

	// @Output() recipeSelected = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
		console.log('recipe item');
	}

	/**
	 * On recipe selected emit event to recipe list component
	 */
	// onSelected() {
	// 	//this.recipeSelected.emit();
	// 	this.recipeService.recipeSelected.emit(this.recipe);
	// }

}
