/**
 * Core module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';
import { NutritionResultListComponent } from '../nutrition-result-list/nutrition-result-list.component';
import { NutritionSearchboxViewComponent } from '../nutrition-search/nutrition-searchbox-view.component';
import { NutritionItemComponent } from '../nutrition-result-list/nutrition-item/nutrition-item.component';
import { NutritionCommonItemComponent } from '../nutrition-result-list/nutrition-item/nutrition-common-item.component';
import { NutritionItemFactComponent } from '../nutrition-result-list/nutrition-item/nutrition-item-fact.component';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { PosterDataService } from '../poster-data/poster-data.service';

/* tslint:disable:indent */
@NgModule({
	declarations: [
		HeaderComponent,
		HomeComponent,
		NutritionResultListComponent,
		NutritionSearchboxViewComponent,
		NutritionItemComponent,
		NutritionCommonItemComponent,
		NutritionItemFactComponent,
		SafeHtmlPipe
	],
	imports: [
		CommonModule,
		SharedModule,
		AppRoutingModule
	],
	exports: [
		AppRoutingModule,
		HeaderComponent
	],
	providers: [
		ShoppingListService,
		RecipeService,
		DataStorageService,
		AuthService,
		AuthGuard,
		PosterDataService
	] // as long as this core module is loaded eagerly
})
export class CoreModule { }
