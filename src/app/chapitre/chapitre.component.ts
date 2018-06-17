import {Component, Input} from '@angular/core';

@Component({
  selector: 'chapitre',
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.css']
})
export class ChapitreComponent {

  @Input() public titre: string;

  constructor() {
  }
}
