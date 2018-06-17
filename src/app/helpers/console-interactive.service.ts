import {Injectable} from '@angular/core';

@Injectable()
export class ConsoleInteractiveService {

  public expandCallback: Function;
  public importCodeCallback: Function;

  constructor() {
  }

  suscribe(expandCallback: Function, importCodeCallback: Function): void {
    this.expandCallback = expandCallback;
    this.importCodeCallback = importCodeCallback;
  }

  open() {
    this.expandCallback(true);
  }

  sendCode(code: string) {
    this.importCodeCallback(code);
  }

}
