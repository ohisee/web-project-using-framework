/**
 * Reverse string
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any, args?: any): any {
		return this.reverse(value);
  }

	private reverse(value: string): string {
		return (value === '' || value.length === 1) ? value : this.reverse(value.substr(1)) + value.charAt(0);
	}

}
