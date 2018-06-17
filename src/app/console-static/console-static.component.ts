import {Component, Input, OnInit} from '@angular/core';
import {ConsoleInteractiveService} from '../helpers/console-interactive.service';

@Component({
  selector: 'app-console-static',
  templateUrl: './console-static.component.html',
  styleUrls: ['./console-static.component.css']
})
export class ConsoleStaticComponent implements OnInit {

  @Input() public text: string[];

  public height: string;

  public init = false;

  constructor(private consoleInteractiveService: ConsoleInteractiveService) {
  }

  ngOnInit() {
    this.height = this.text.length.toString();
    this.init = true;
  }

  get code() {
    return this.text.join('\n');
  }

  public export() {
    this.consoleInteractiveService.sendCode(this.code);
    this.consoleInteractiveService.open();
  }

}
