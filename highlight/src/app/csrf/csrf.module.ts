/**
 * This is CSRF module
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';

export function cookieXsrfFactory() {
	return new CookieXSRFStrategy('XSRF-TOKEN' , 'X-XSRF-TOKEN');
}

@NgModule({
	imports: [
		CommonModule,
		HttpModule
	],
	providers: [
		{
			provide: XSRFStrategy,
			//useFactory: () => new CookieXSRFStrategy('XSRF-TOKEN' , 'X-XSRF-TOKEN')
			useFactory: cookieXsrfFactory
		}
	]
})
export class CsrfModule { }
