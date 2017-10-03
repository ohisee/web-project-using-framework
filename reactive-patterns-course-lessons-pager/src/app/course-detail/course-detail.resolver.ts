import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Course } from '../shared/model/course';
import { Lesson } from '../shared/model/lesson';
import { CoursesService } from '../services/courses.service';

@Injectable()
export class CourseDetailResolver implements Resolve<[Course, (Lesson[])]> {

  constructor(private coursesService: CoursesService) { }

  /**
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {([Course, (Lesson[])] | Observable<[Course, (Lesson[])]> | Promise<[Course, (Lesson[])]>)} 
   * @memberof CourseDetailResolver
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Course, (Lesson[])]> {
    return this.coursesService.findCourseByUrl(route.params['id']).switchMap(
      (course) => {
        return this.coursesService.findLessonsForCourse(course.id);
      },
      (course, lessons, outer, inner) => {
        // const ret: [Course, Lesson[]] = [course, lessons];
        // return ret;
        return (<[Course, (Lesson[])]>[course, lessons]);
      }
    );
  }

}
