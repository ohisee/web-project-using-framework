import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Lesson } from '../shared/model/lesson';

@Injectable()
export class LessonsPagerService {

  private static readonly PAGE_SIZE = 2;
  private subject = new BehaviorSubject<Lesson[]>([]); // stateful subject to remember data
  private courseId: number;

  lesssonPage$: Observable<Lesson[]> = this.subject.asObservable();

  currentPageNumber: number = 1;

  constructor(private http: Http) { }

  loadFirstPage(courseId: number): Observable<any> {
    this.courseId = courseId;
    this.currentPageNumber = 1;
    return this.loadPage(this.currentPageNumber);
    // this.http.get('/api/lessons', {
    //   params: {
    //     courseId: this.courseId,
    //     pageNumber: 1,
    //     pageSize: LessonsPagerService.PAGE_SIZE
    //   }
    // }).map(
    //   (response) => {
    //     return response.json().payload;
    //   }
    // ).subscribe(
    //   (lessons) => {
    //     this.subject.next(lessons);
    //   }
    // );
  }

  previous(): Observable<any> {
    if (this.currentPageNumber - 1 >= 1) {
      this.currentPageNumber -= 1;
    }
    return this.loadPage(this.currentPageNumber);
  }

  next(): Observable<any> {
    this.currentPageNumber += 1;
    return this.loadPage(this.currentPageNumber);
  }

  loadPage(pageNumber: number): Observable<any> {
    // this.http.get('/api/lessons', {
    //   params: {
    //     courseId: this.courseId,
    //     pageNumber: pageNumber,
    //     pageSize: LessonsPagerService.PAGE_SIZE
    //   }
    // }).map(
    //   (response) => {
    //     return response.json().payload;
    //   }
    // ).subscribe(
    //   (lessons) => {
    //     this.subject.next(lessons);
    //   }
    // );
    return this.http.get('/api/lessons', {
      params: {
        courseId: this.courseId,
        pageNumber: pageNumber,
        pageSize: LessonsPagerService.PAGE_SIZE
      }
    }).map(
      (response) => {
        return response.json().payload;
      }
    ).do(
      (lessons) => {
        this.subject.next(lessons);
      }
    ).publishLast().refCount();
  }

}
