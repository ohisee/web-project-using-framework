import { Component, OnInit } from '@angular/core';
// import { globalEventBus, LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON } from './event-bus';
import { Lesson } from '../shared/model/lesson';
import { testLessons } from '../shared/model/test-lessons';
import { Observer, store } from '../event-bus-experiments/app-data';

@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

  // private lessons: Lesson [];

  constructor() { }

  ngOnInit() {
    console.log('Top level component broadcasted all lessons ...');

    // this.lessons = testLessons.slice(0);

    store.initializeLessonList(testLessons.slice(0));

    // globalEventBus.notifyObserver(LESSONS_LIST_AVAILABLE, this.lessons);

    // simulate server push new lesson to UI
    setTimeout(() => {
      // this.lessons.push({
      //   id: Math.random(),
      //   description: 'New lession arriving from server'
      // });

      const newLesson = {
        id: Math.random(),
        description: 'New lession arriving from server'
      };

      // globalEventBus.notifyObserver(LESSONS_LIST_AVAILABLE, this.lessons);
      store.addLesson(newLesson);

    }, 10000);

  }

  addLesson(lessonText: string) {
    // globalEventBus.notifyObserver(ADD_NEW_LESSON, lessonText);
    const newLesson = {
      id: Math.random(),
      description: lessonText
    };
    store.addLesson(newLesson);
  }

}
