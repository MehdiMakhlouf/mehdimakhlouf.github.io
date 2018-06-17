import {Component, OnInit, Inject} from '@angular/core';
import {ConsoleInteractiveService} from '../helpers/console-interactive.service';

enum TypeLog {
  INFO, ERREUR
}

class Log {
  libelle: string;
  type: TypeLog;

  constructor(type, libelle) {
    this.libelle = libelle;
    this.type = type;
  }

  isInfo(): boolean {
    return this.type === TypeLog.INFO;
  }
}

@Component({
  selector: 'app-console-interactive',
  templateUrl: './console-interactive.component.html',
  styleUrls: ['./console-interactive.component.css']
})
export class ConsoleInteractiveComponent implements OnInit {
  public textConsole = '';
  public output: Log[] = [];
  public isExpand: boolean;

  constructor(private consoleInteractiveService: ConsoleInteractiveService) {
    const oldConsole = console.log.bind(console);
    console.log = (...args: any[]) => {
      this.output.push(new Log(TypeLog.INFO, this.traiterArguments(args)));
      if (args) {
        oldConsole(...args);
      } else {
        oldConsole(args);
      }
    };
  }

  ngOnInit(): void {
    this.output = [];
    this.consoleInteractiveService.suscribe(this.expand.bind(this), (code: string) => {
      this.textConsole = code;
    });
  }


  public evaluate() {
    try {
      eval.bind(window)(this.textConsole);
    } catch (e) {
      this.output.push(new Log(TypeLog.ERREUR, e.toString()));
    }
  }

  public clear() {
    this.output = [];
  }

  public expand(isExpand: boolean) {
    if (isExpand === undefined) {
      this.isExpand = !this.isExpand;
    } else {
      this.isExpand = isExpand;
    }
  }

  private traiterArguments(args): string {
    let result = '';
    if (args.isArray) {
      result += args.map(arg => arg.toString ? arg.toString() : arg);
    } else {
      result = args;
    }
    return result;
  }
}
