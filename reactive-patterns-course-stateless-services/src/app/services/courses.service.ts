import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

import { Course } from '../shared/model/course';
import { Lesson } from '../shared/model/lesson';

/**
 * Stateless observable approach, no local variable to avoid introduce state,
 * and no returning any result from fetching DB
 * @export
 * @class CoursesService
 */
@Injectable()
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }

  /**
   * Use first or take(1) to avoid reflecting subsequent DB update on screen,
   * long live or short live observable
   *
   * @returns {Observable<Course[]>}
   * @memberof CoursesService
   */
  public findAllCourses(): Observable<Course[]> {
    return this.db.list('courses').first().do(console.log);
  }

  /**
   * @returns {Observable<Lesson[]>}
   * @memberof CoursesService
   */
  public findLatestLessons(): Observable<Lesson[]> {
    return this.db.list('lessons', {
      query: {
        orderByKey: true,
        limitToLast: 10
      }
    }).first().do(console.log);
  }

  /**
   * @param {string} courseUrl
   * @returns {Observable<Course>}
   * @memberof CoursesService
   */
  public findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.list('courses', {
      query: {
        orderByChild: 'url',
        equalTo: courseUrl
      }
    }).first().map(data => data[0]);
  }

  /**
   * @param {string} courseId
   * @returns {Observable<Lesson[]>}
   * @memberof CoursesService
   */
  public findLessonsForCourse(courseId: string): Observable<Lesson[]> {
    return this.db.list('lessons', {
      query: {
        orderByChild: 'courseId',
        equalTo: courseId, // data.$key
      }
    }).first();
  }

}
