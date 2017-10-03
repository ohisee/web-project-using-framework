import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'browser-event-experiments',
  templateUrl: './browser-event-experiments.component.html',
  styleUrls: ['./browser-event-experiments.component.css']
})
export class BrowserEventExperimentsComponent implements OnInit {

  hoverSection: HTMLElement;

  constructor() { }

  onMouseMove(event: MouseEvent) {
    console.log('Mousemove', event);
  }

  onClick(event: Event) {
    console.log('Click', event);
  }

  ngOnInit() {
    this.hoverSection = document.getElementById('hover');
    this.hoverSection.addEventListener('mousemove', this.onMouseMove);
    this.hoverSection.addEventListener('click', this.onClick);
  }

  unsubscribe() {
    console.log('called unsubscribe');
    this.hoverSection.removeEventListener('mousemove', this.onMouseMove);
  }


}
