/**
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

/* tslint:disable:indent */
@NgModule({
	declarations: [
		ShoppingListComponent,
		ShoppingEditComponent
	],
	imports: [
		CommonModule,
		FormsModule
	]
})
export class ShoppingListModule { }
