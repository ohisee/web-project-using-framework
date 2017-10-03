import { ReversePipe } from './reverse.pipe';

describe('Reverse Pipe Test', () => {

	it('should reverse', () => {
		let reversePipe = new ReversePipe();
		expect(reversePipe.transform('hello')).toEqual('olleh');
	});

});
