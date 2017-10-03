/**
 * Sort pipe
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
	pure: false // bad performance bahavior
})
export class SortPipe implements PipeTransform {

  transform(value: any, propName: string): any {
		if (value.length === 0 || value.length === 1) {
			return value;
		}
    return value.sort((a, b) => {
			return (a[propName] < b[propName]) ? -1 : (a[propName] > b[propName]) ? 1 : 0;
		});
  }

}
