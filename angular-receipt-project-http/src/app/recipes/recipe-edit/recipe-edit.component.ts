/**
 * This is edit recipe component
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

/* tslint:disable:indent */
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = (params['id'] != null);
        // console.log(params['id']);
        // console.log(this.editMode);
        this.initializeForm();
      }
    );
    console.log('recipe - edit', this.id, this.editMode);
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  private initializeForm() {
    let recipeName: string = '';
    let recipeImagePath: string = '';
    let recipeDescription: string = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.store.select('recipes')
        .take(1)
        .subscribe((recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          // if (recipe['ingredients']) {
          if (recipe.ingredients != null) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(new FormGroup({
                'name': new FormControl(ingredient.name, [Validators.required]),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              }));
            }
          }
        });
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]), // only pass method reference
      'imagePath': new FormControl(recipeImagePath, [
        Validators.required,
        Validators.pattern(/^(http|https)\:\/\/.+(recipe)/)
      ]),
      'description': new FormControl(recipeDescription, [
        Validators.required,
        Validators.maxLength(180)]),
      'ingredients': recipeIngredients
    });
  }

	/**
	 * Return FormGroup's form array data for AOT compilation
	 */
  get ingredientsFormData(): FormArray {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, newRecipe);
      this.store.dispatch(new RecipeActions.UpdateRecipe({
        index: this.id,
        updatedRecipe: newRecipe
      }));
    } else {
      // this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));
    }
    this.goUp();
  }

  onCancel() {
    this.goUp();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

	/**
	 * Navigate to upper route
	 */
  private goUp() {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute
    });
  }

}
