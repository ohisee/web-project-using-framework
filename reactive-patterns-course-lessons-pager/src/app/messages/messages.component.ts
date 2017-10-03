import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  errors$: Observable<string[]> = Observable.of([]);

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.errors$ = this.messageService.errors$;
  }

  close() {
    this.messageService.error();
  }

}
