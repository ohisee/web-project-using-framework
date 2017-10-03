/**
 * This is Ingredient Model.
 */
export class Ingredient {

	// public name: string;
	// public amount: number;

	// constructor(name: string, amount: number) {
	// 	this.name = name;
	// 	this.amount = amount;
	// }

	constructor(private _name: string, private _amount: number) {}

	get name(): string {
		return this._name;
	}

	get amount(): number {
		return this._amount;
	}

}
