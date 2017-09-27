/**
 * This is a modal
 */
import { Directive, HostListener, HostBinding, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

/* tslint:disable:indent */
@Directive({
  selector: '[appModal]'
})
export class ModalDirective implements OnInit, OnDestroy {

	private subscription: Subscription;

	@Output() fadeIn = new EventEmitter<boolean>();
	@HostBinding('class.in') isIn: boolean = false;
	@HostBinding('style.display') isDisplay: string = 'none';
	@HostBinding('style.padding-right') padding: string = '';

	@HostListener('click') onClick() {
		this.isIn = false;
		this.isDisplay = 'none';
		this.padding = '';
		this.fadeIn.emit(false);
	}

  constructor(private authService: AuthService) { }

	/**
	 * On Init, subscribe event
	 */
	ngOnInit() {
		this.subscription = this.authService.notAuthenticated$.subscribe(
			(signedin: boolean) => {
				if (!signedin) {
					this.isIn = true;
					this.isDisplay = 'block';
					this.padding = '15px';
					this.fadeIn.emit(true);
				}
			}
		);
	}

	/**
	 * Clear the subscription
	 */
	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
			console.log('leaving modal directive');
		}
	}

}
