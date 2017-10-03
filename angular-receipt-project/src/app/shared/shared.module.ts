/**
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { ModalDirective } from './modal/modal.directive';
import { ModalComponent } from './modal/modal.component';

@NgModule({
	declarations: [
		DropdownDirective,
		ModalDirective,
		ModalComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		DropdownDirective,
		ModalComponent
	]
})
export class SharedModule { }
