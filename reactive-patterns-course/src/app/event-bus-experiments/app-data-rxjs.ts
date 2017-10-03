import * as _ from 'lodash';
import { Lesson } from '../shared/model/lesson';
import { Subject, Observer, Observable, BehaviorSubject } from 'rxjs/Rx';

/**
 * Store reactive pattern using RxJS
 * @class DataStore
 */
class DataStore {

  private lessonListSubject = new BehaviorSubject<Lesson[]>([]);

  public lessonsList$: Observable<Lesson[]> = this.lessonListSubject.asObservable();

  public initializeLessonList(newList: Lesson[]): void {
    // this.lessons = _.cloneDeep(newList);
    // this.broadcast();
    this.lessonListSubject.next(_.cloneDeep(newList));
  }

  public addLesson(newLesson: Lesson): void {
    // this.lessons.push(_.cloneDeep(newLesson));
    // this.broadcast();
    const lessons = this.cloneLessons();
    lessons.push(newLesson);
    this.lessonListSubject.next(lessons);
  }

  public deleteLesson(deletedLesson: Lesson) {
    const lessons = this.cloneLessons();
    _.remove(lessons, (lesson) => {
      return (lesson.id === deletedLesson.id);
    });
    this.lessonListSubject.next(lessons);
  }

  public toggleLessonViewed(toggledLesson: Lesson) {
    const lessons = this.cloneLessons();
    const lesson = _.find(lessons, (les) => {
      return (les.id === toggledLesson.id);
    });
    lesson.completed = !lesson.completed;
    // this.broadcast();
    this.lessonListSubject.next(lessons);
  }

  private broadcast() {
    // this.lessonListSubject.next(_.cloneDeep(this.lessons));
  }

  private cloneLessons(): Lesson[] {
    return _.cloneDeep(this.lessonListSubject.getValue());
  }

}

export const store = new DataStore();
