/**
 * This is Header Component.
 */
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as RecipeActions from '../../recipes/store/recipe.actions';

/* tslint:disable:indent */
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
export class HeaderComponent implements OnInit {

	@Output() featureSelected = new EventEmitter<string>();

	private _menuCollapsed: boolean = true;
	private _divCollapse: boolean = true;
	private _divCollapsing: boolean = false;
	private _divIn: boolean = false;

	authState$: Observable<fromAuth.State>;

	constructor(
		private dataStoreService: DataStorageService,
		private _authService: AuthService,
		private store: Store<fromApp.AppState>) { }

	ngOnInit() {
		this.authState$ = this.store.select('auth');
	}


	/**
	 * Getter to get authService for AOT compilation
	 */
	get authService(): AuthService {
		return this._authService;
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
		// this.dataStoreService.storeRecipes().subscribe(
		// 	(response: Response) => {
		// 		console.log(response);
		// 	}
		// );
		this.store.dispatch(new RecipeActions.StoreRecipes());
	}

	/**
	 * Fetch data from storage
	 */
	onFetchData() {
		// this.dataStoreService.getRecipes();
		this.store.dispatch(new RecipeActions.FetchRecipes());
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
