import { Component, Input } from '@angular/core';
import { Lesson } from '../shared/model/lesson';

/**
 * This is pure presentational component, recevie data stream and display data stream
 * @export
 * @class LessonssListComponent
 */
@Component({
  selector: 'lessonss-list',
  templateUrl: './lessonss-list.component.html'
})
export class LessonssListComponent {

  @Input() lessons: Lesson[];

  constructor() { }

}
