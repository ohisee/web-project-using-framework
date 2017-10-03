import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from "rxjs";
import { Lesson } from "../shared/model/lesson";
import { CoursesHttpService } from "../services/courses-http.service";
import { Course } from "../shared/model/course";
import { LessonsPagerService } from '../services/lessons-pager.service';
import { MessageService } from '../services/message.service';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    providers: [LessonsPagerService, MessageService]
})
export class CourseComponent implements OnInit, OnDestroy {

    @Input()
    id: number;

    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>; // stateful
    detail$: Observable<Lesson>;

    constructor(
        private coursesService: CoursesHttpService,
        private lessonsPagerService: LessonsPagerService, 
        private messageService: MessageService) {
    }

    ngOnInit() {
        this.course$ = this.coursesService.findCourseById(this.id);
        this.lessons$ = this.lessonsPagerService.lesssonPage$;
        this.lessonsPagerService.loadFirstPage(this.id).subscribe(
            () => {

            },
            (error) => {
                this.messageService.error('Could not load first page');
            }
        );
    }

    previousLessonsPage() {
        this.lessonsPagerService.previous().subscribe(
            () => {

            },
            (error) => {
                this.messageService.error('Could not load previous page');
            }
        );;
    }

    nextLessonsPage() {
        this.lessonsPagerService.next().subscribe(
            () => {

            },
            (error) => {
                this.messageService.error('Could not load next page');
            }
        );;
    }

    selectDetail(lesson: Lesson) {
        this.detail$ = this.coursesService.findLessonDetailById(lesson.url);
    }

    backToMaster() {
        this.detail$ = undefined;
    }

    ngOnDestroy() {
        console.log('destroying CourseComponent ...');
    }

}








