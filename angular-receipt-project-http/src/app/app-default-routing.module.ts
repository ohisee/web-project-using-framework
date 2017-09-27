/**
 * Should be a last resort route
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appDefaultRoutes: Routes = [
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	} // make sure this is the last route
];

@NgModule({
	imports: [
		RouterModule.forChild(appDefaultRoutes)
	],
	exports: [RouterModule]
})
export class AppDefaultRoutingModule { }
