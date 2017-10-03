export class Error {

  constructor(private _title: string, private _message: string) { }

  get title(): string {
    return this._title;
  }

  get message(): string {
    return this._message;
  }

  set title(title: string) {
    this._title = title;
  }

  set message(message: string) {
    this._message = message;
  }

}
