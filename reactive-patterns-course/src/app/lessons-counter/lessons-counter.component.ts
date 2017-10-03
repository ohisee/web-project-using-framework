import { Component, OnInit } from '@angular/core';
// import { globalEventBus, Observer, LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';
import { store } from '../event-bus-experiments/app-data';
import { Observer } from 'rxjs/Rx';

@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements OnInit, Observer<Lesson[]> {

  lessonsCounter = 0;

  constructor() {
    // globalEventBus.registerObserver(LESSONS_LIST_AVAILABLE, this);
    // globalEventBus.registerObserver(ADD_NEW_LESSON, {
    //   notify: (lessonText) => {
    //     this.lessonsCounter += 1;
    //   }
    // });
  }

  ngOnInit() {
    console.log('lesson counter component is registered as observer ...');
    // store.lessonsList$.subscribe(this);
    store.subscribe(this);
  }

  // notify(data: Lesson[]) {
  //   console.log('counter component received data ...');
  //   this.lessonsCounter = data.length;
  // }

  next(data: Lesson[]) {
    console.log('counter component received data ...');
    this.lessonsCounter = data.length;
  }

  error(error: any) {
    console.log('Lessons counter component', error);
  }

  complete() {
    console.log('Lessons counter component completed');
  }

}
