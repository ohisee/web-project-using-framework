import { Component } from '@angular/core';

@Component({
  selector: 'app-messagener',
  templateUrl: './messagener.component.html',
  styleUrls: ['./messagener.component.css']
})
export class MessagenerComponent {

  title: string = 'angular testing';
  showMsg: boolean = false;

  onClick() {
    this.showMsg = true;
  }

}
