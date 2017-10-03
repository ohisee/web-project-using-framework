/**
 * This is Recipe Model.
 */
import { Ingredient } from '../shared/ingredient.model';

export class Recipe {

	private _name: string;
	private _description: string;
	private _imagePath: string;
	private _ingredients: Ingredient[];

	/**
	 * Recipe constructor
	 */
	constructor(name: string, description: string, imagePath: string, ingredients?: Ingredient[]) {
		this._name = name;
		this._description = description;
		this._imagePath = imagePath;
		this._ingredients = ingredients;
	}

	get name(): string {
		return this._name;
	}

	get description(): string {
		return this._description;
	}

	get imagePath(): string {
		return this._imagePath;
	}

	get ingredients(): Ingredient[] {
		return this._ingredients;
	}

	set ingredients(ingredients: Ingredient[]) {
		this._ingredients = ingredients;
	}

}
