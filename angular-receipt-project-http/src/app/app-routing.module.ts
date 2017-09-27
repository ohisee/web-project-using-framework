/**
 * This is app routing module
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';

/* tslint:disable:indent */
const appRoutes: Routes = [
	// {
	// 	path: '',
	// 	redirectTo: '/recipes',
	// 	pathMatch: 'full' // rediect only if the full path is empty ''
	// },
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'recipes',
		loadChildren: './recipes/recipes.module#RecipesModule', // load a URL string, lazy loading
		// canLoad:[AuthGuard] // guard
	},
	{
		path: 'shopping-list',
		component: ShoppingListComponent
	},
	// {path: '**', redirectTo: '', pathMatch: "full"} // make sure this is last route
];
// preloadingStrategy: PreloadAllModules will preload all lazy loaded modules after app is loaded
@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, {
			preloadingStrategy: PreloadAllModules
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
