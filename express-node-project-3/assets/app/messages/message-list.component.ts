import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message-list',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <app-message
        *ngFor="let message of messages"
        [message]="message"></app-message>
  	</div>
  `,
  /*
  <app-message
    *ngFor="let message of messages"
    [message]="message"
    (editClicked)="message.content = $event"></app-message>
   */
  //providers:[MessageService]
})
export class MessageListComponent implements OnInit {

  	private _messages: Message[] = null;

    constructor(private messageService: MessageService) {}

  	get messages(): Message[] {
  		return this._messages;
  	}

    ngOnInit() {
      this.messageService.getMessages().subscribe(
        (messages: Message[]) => {
          this._messages = messages;
        },
        (error) => {},
        () => {}
      );
    }
}
