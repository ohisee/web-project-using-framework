import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from "../shared/model/course";
import { Lesson } from "../shared/model/lesson";
import * as _ from 'lodash';
import { CoursesService } from "../services/courses.service";
import { NewsletterService } from "../services/newsletter.service";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";

/**
 * This is an example of container component
 * @export
 * @class CourseDetailComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  /**
   * Creates an instance of CourseDetailComponent.
   * No need to inject, private coursesService: CoursesService,
   * private userService:UserService
   * @param {ActivatedRoute} route
   * @memberof CourseDetailComponent
   */
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    // this.course$ = this.route.params
    //     .switchMap((params) => {
    //         console.log(params['id']);
    //         return this.coursesService.findCourseByUrl(params['id']);
    //     })
    //     .first()
    //     .publishLast().refCount();

    // this.lessons$ = this.course$
    //     .switchMap(course => this.coursesService.findLessonsForCourse(course.id))
    //     .first()
    //     .publishLast().refCount();

    this.course$ = this.route.data.map(
      (data) => {
        return data['detail'][0];
      }
    );

    this.lessons$ = this.route.data.map(
      (data) => {
        return data['detail'][1];
      }
    )

  }


}
