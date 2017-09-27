/**
 * This is counter service
 */
export class CounterService {

	private counter: number = 0;

	increment() {
		this.counter++;
	}

}
