import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { ErrorService } from '../errors/error.service';
import { Error } from '../errors/error.model';

@Injectable()
export class MessageService {

  private messages: Message[] = [];

  private URL: string = 'http://localhost:3000/message';

  messageIsEdit: EventEmitter<Message> = new EventEmitter<Message>();

  constructor(private http: Http, private errorService: ErrorService) { }

  addMessage(message: Message) {
    //this.messages.push(message);
    //const body = JSON.stringify(message);
    const body = JSON.stringify(message.toObject());
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = sessionStorage.getItem('token') ? '?token=' + sessionStorage.getItem('token') : '';
    return this.http.post(this.URL + token, body, {headers: headers})
      .map(
        (response: Response) => {
          const result = response.json();
          const message = new Message(
            result.obj.content,
            result.obj.user.firstName,
            result.obj._id,
            result.obj.user._id);
          this.messages.push(message);
          return message;
        }
      )
      .catch(
        //(error: Response) => Observable.throw(error.json())
        (error: Response) => this.handleError(error, 'add')
      );
  }

  getMessages() {
    return this.http.get(this.URL).map(
      (response: Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];
        for (let message of messages) {
          transformedMessages.push(new Message(
            message.content,
            message.user.firstName,
            message._id,
            message.user._id));
        }
        this.messages = transformedMessages;
        return transformedMessages;
      }
    ).catch(
      //(error: Response) => Observable.throw(error.json())
      (error: Response) => this.handleError(error, 'fetch')
    );
  }

  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    const token = sessionStorage.getItem('token') ? '?token=' + sessionStorage.getItem('token') : '';
    return this.http.delete(this.URL + '/' + message.messageId + token)
      .map(
        (response: Response) => response.json()
      )
      .catch(
        //(error: Response) => Observable.throw(error.json())
        (error: Response) => this.handleError(error, 'delete')
      );
  }

  editMessage(message: Message) {
    this.messageIsEdit.emit(message);
  }

  updateMessage(message: Message) {
    const body = JSON.stringify(message.toObject());
    const headers = new Headers({'Content-Type': 'application/json'})
    const token = sessionStorage.getItem('token') ? '?token=' + sessionStorage.getItem('token') : '';
    return this.http.patch(this.URL + '/' + message.messageId + token, body, {headers: headers})
      .map(
        (response: Response) => response.json()
      )
      .catch(
        //(error: Response) => Observable.throw(error.json())
        (error: Response) => {
          return this.handleError(error, 'update');
        }
      );
  }

  /**
   * @param error
   */
  private handleError(error: Response, action: string) {
    if (!error.hasOwnProperty('json')) {
      this.errorService.handelError(
        new Error('An error occurred', 'Unable to ' + action + ' message')
      );
      return Observable.throw(error);
    }
    this.errorService.handelError(error.json());
    return Observable.throw(error.json());
  }

}
