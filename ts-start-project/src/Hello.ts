/**
 * Typescript class
 */
class Hello {

	constructor(private _title: string) {}

	get title(): string {
		return this._title;
	}

	set title(title: string) {
		this._title = title;
	}

}

// try other types

let a: Array<string>;
a = ['1', '2'];

let b: Hello;
b = new Hello('www');

interface User {
	username: string;
	password: string;
	confirmPassword? : string;
}

interface CanDrive {
	accelerate(speed: number): void;
}

let RunningCar: CanDrive = {
	accelerate(speed: number): void {

	}
};

let n: Array<number>;
n = [1, 2, 3];

export class ExportedClass {
	name: string = 'abc';
}
