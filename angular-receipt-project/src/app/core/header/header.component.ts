/**
 * This is Header Component.
 */
import { Component, EventEmitter, Output } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { Response } from '@angular/http';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	animations: [
		trigger('divMenuState', [
			state('collapsed', style({
				height: '0px'
			})),
			state('expanded', style({
				height: '*'
			})),
			transition('collapsed => expanded', animate('300ms', style({
				height: '250px'
			}))),
			transition('expanded => collapsed', animate('500ms'))
		])
	]
})
export class HeaderComponent {

	@Output() featureSelected = new EventEmitter<string>();

	private _menuCollapsed: boolean = true;
	private _divCollapse: boolean = true;
	private _divCollapsing: boolean = false;
	private _divIn: boolean = false;

	constructor(
		private dataStoreService: DataStorageService,
		private _authService: AuthService) { }

	/**
	 * Getter to get authService for AOT compilation
	 */
	get authService(): AuthService {
		return this._authService
	}

	/**
	 * Get menu collapsed
	 */
	get menuCollapsed(): boolean {
		return this._menuCollapsed;
	}

	get divIn(): boolean {
		return this._divIn;
	}

	get divCollapse(): boolean {
		return this._divCollapse;
	}

	get divCollapsing(): boolean {
		return this._divCollapsing;
	}

	/**
	 * To emit selection event
	 */
	onSelect(feature: string) {
		this.featureSelected.emit(feature);
	}

	/**
	 * Store data in storage
	 */
	onSaveData() {
		this.dataStoreService.storeRecipes().subscribe(
			(response: Response) => {
				console.log(response);
			}
		);
	}

	/**
	 * Fetch data from storage
	 */
	onFetchData() {
		this.dataStoreService.getRecipes();
	}

	onSignout() {
		this.authService.signOut();
	}

	/**
	 * Open navigation menu
	 */
	toggleMenu() {
		this._menuCollapsed = !this._menuCollapsed;
		if (!this._menuCollapsed) {
			this._divCollapse = false;
			this._divCollapsing = true;
			this._divCollapsing = false;
			this._divCollapse = true;
			this._divIn = true;
		} else {
			this._divIn = false;
			this._divCollapsing = true;
			this._divCollapsing = false;
			this._divCollapse = true;
		}
	}

}
