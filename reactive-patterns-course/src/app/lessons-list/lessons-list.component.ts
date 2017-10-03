import { Component, OnInit } from '@angular/core';
// import { globalEventBus, Observer, LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';
import { store } from '../event-bus-experiments/app-data';
import * as _ from 'lodash';
import { Observer } from 'rxjs/Rx';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit, Observer<Lesson[]> {

  lessons: Lesson[] = [];

  constructor() {
    console.log('Lesson list component is registered as observer ...');
    // globalEventBus.registerObserver(LESSONS_LIST_AVAILABLE, this);
    // globalEventBus.registerObserver(ADD_NEW_LESSON, {
    //   notify: (lessonText) => {
    //     this.lessons.push({
    //       id: Math.random(),
    //       description: lessonText
    //     });
    //   }
    // });
   }

  ngOnInit() {
    // store.lessonsList$.subscribe(this);
    store.subscribe(this);
  }

  // notify(data: Lesson[]) {
  //   console.log('Lesson list component received data');
  //   this.lessons = data.slice(0);
  // }

  toggleLessonViewed(lesson: Lesson) {
    console.log('toggling lesson ...');
    // lesson.completed = !lesson.completed;
    store.toggleLessonViewed(lesson);
  }

  delete(deletedLesson: Lesson) {
    // _.remove(this.lessons, (lesson) => {
    //   return (lesson.id === deletedLesson.id);
    // });
    store.deleteLesson(deletedLesson);
  }

  /**
   * @param {Lesson[]} data
   * @memberof LessonsListComponent
   */
  next(data: Lesson[]) {
    console.log('Lesson list component received data');
    this.lessons = data;
  }

  /**
   * @param {*} error
   * @memberof LessonsListComponent
   */
  error(error: any) {
    console.log('Lessons list component Error ', error);
  }

  /**
   * @memberof LessonsListComponent
   */
  complete() {
    console.log('Lessons list component completed');
  }

}
