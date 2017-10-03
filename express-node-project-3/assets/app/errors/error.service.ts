import { EventEmitter } from '@angular/core';
import { Error } from './error.model';

export class ErrorService {
  errorOccurred = new EventEmitter<Error>();

  handelError(error: any) {
    const errorData = (error instanceof Error) ? error : new Error(error.title, error.error.message);
    this.errorOccurred.emit(errorData);
  }
}
