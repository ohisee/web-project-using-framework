import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NewsletterService } from '../services/newsletter.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush // only render if there is a change on input, output, or async observable
})
export class NewsletterComponent implements OnInit {

    firstName$: Observable<string>;

    // @Input()
    // firstName: string;

    // @Output()
    // subscribe = new EventEmitter();

    constructor(
        private newsletterService: NewsletterService,
        private userService: UserService) { }

    ngOnInit() {
        this.firstName$ = this.userService.user$.map(
            (user) => {
                return user.firstName;
            }
        );
    }

    // subscribeToNewsletter(emailField) {
    //     this.subscribe.emit(emailField.value);
    //     emailField.value = '';
    // }

    subscribeToNewsletter(emailField) {
        this.newsletterService.subscribeToNewsletter(emailField.value)
            .subscribe(
            () => {
                emailField.value = '';
                alert('Subscription successful ...');
            },
            console.error
            );
    }


}
