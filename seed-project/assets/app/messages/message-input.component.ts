import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  //providers: [MessageService]
})
export class MessageInputComponent implements OnInit {

  private _message: Message = null;

  constructor(private messageService: MessageService) {}

  get message(): Message {
    return this._message;
  }

  /**
   * Message sent from subscribe is by reference
   */
  ngOnInit() {
    this.messageService.messageIsEdit.subscribe(
      (message: Message) => {
        this._message = message;
      }
    );
  }

  onSubmit(form: NgForm) {
    const c = form.value.content
    if (this._message != null) {
      this._message.content = c;
      this.messageService.updateMessage(this._message).subscribe(
        (result) => console.log(result),
        (error) => {},
        () => {}
      );
      this._message = null;
    } else {
      this.messageService.addMessage(new Message(c, 'person r')).subscribe(
        (data) => console.log(data),
        (error) => console.log(error),
        () => console.log('completed')
      );
    }
    form.reset();
  }

  onClear(form: NgForm) {
    this._message = null;
    form.reset();
  }

}
