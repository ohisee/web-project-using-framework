import * as _ from 'lodash';
import { Lesson } from '../shared/model/lesson';

/**
 * Observable pattern
 * @export
 * @interface Observer
 */
export interface Observer {
  next(data: any); // new way of Observable approach
}

export interface Observable {
  subscribe(observer: Observer); // new way of Observable approach
  unsubscribe(observer: Observer); // new way of Observable approach
}

/**
 * @interface Subject
 */
interface Subject extends Observer, Observable { }

/**
 * Observable subject implementation
 */
class SubjectImplementation implements Subject {

  private observers: Observer[] = [];

  /**
   * @param {*} data
   * @memberof SubjectImplementation
   */
  next(data: any) {
    this.observers.forEach((observer) => {
      observer.next(data);
    });
  }

  /**
   * @param {Observer} observer
   * @memberof SubjectImplementation
   */
  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  /**
   * @param {Observer} observer
   * @memberof SubjectImplementation
   */
  unsubscribe(observer: Observer) {
    _.remove(this.observers, (element) => {
      return (element === observer);
    });
  }

}

/**
 * Store reactive pattern
 * @class DataStore
 */
class DataStore implements Observable {


  private lessons: Lesson[] = [];

  private lessonListSubject = new SubjectImplementation();

  public lessonsList$: Observable = {
    subscribe: (observer) => {
      this.lessonListSubject.subscribe(observer);
      observer.next(this.lessons);
    },

    unsubscribe: (observer) => {
      this.lessonListSubject.unsubscribe(observer);
    }
  };

  public subscribe(observer: Observer) {
    this.lessonListSubject.subscribe(observer);
    observer.next(this.lessons);
  }

  public unsubscribe(observer: Observer) {
    this.lessonListSubject.unsubscribe(observer);
  }

  public initializeLessonList(newList: Lesson[]): void {
    this.lessons = _.cloneDeep(newList);
    this.broadcast();
  }

  public addLesson(newLesson: Lesson): void {
    this.lessons.push(_.cloneDeep(newLesson));
    this.broadcast();
  }

  public deleteLesson(deletedLesson: Lesson) {
    _.remove(this.lessons, (lesson) => {
      return (lesson.id === deletedLesson.id);
    });
    this.broadcast();
  }

  public toggleLessonViewed(toggledLesson: Lesson) {
    const lesson = _.find(this.lessons, (les) => {
      return (les.id === toggledLesson.id);
    });
    lesson.completed = !lesson.completed;
    this.broadcast();
  }

  private broadcast() {
    this.lessonListSubject.next(_.cloneDeep(this.lessons));
  }

}

export const store = new DataStore();
