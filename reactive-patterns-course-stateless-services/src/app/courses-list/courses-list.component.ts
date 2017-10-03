import { Component, OnInit, Input } from '@angular/core';

import { Course } from '../shared/model/course';

/**
 * This is a representational component that only contains logics on how to
 * display courses on the screen without any other specific logics
 *
 * @export
 * @class CoursesListComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Course[];

  constructor() { }

  ngOnInit() { }

}
