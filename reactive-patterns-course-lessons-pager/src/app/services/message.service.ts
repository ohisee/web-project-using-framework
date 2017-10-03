import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class MessageService {

  private errorsSubject = new BehaviorSubject<string[]>([]);
  errors$:Observable<string[]> = this.errorsSubject.asObservable();  

  constructor() { }

  error(...errors: string[]) {
    this.errorsSubject.next(errors);
  }

}
