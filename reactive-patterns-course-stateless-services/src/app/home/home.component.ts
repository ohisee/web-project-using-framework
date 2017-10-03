import { Component, OnInit } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';
import { Course } from '../shared/model/course';
import { Lesson } from '../shared/model/lesson';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs/Rx';

/**
 * Define stream of data, does not hold reference to the data, what are the data streams
 * do view need to display data, and how to obtain data streams from service layer.
 * 
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // courses: Course[];
    // latestLessons: Lesson[];

    courses$: Observable<Course[]>;
    latestLessons$: Observable<Lesson[]>;

    constructor(private coursesService: CoursesService) { }

    ngOnInit() {

        // this.db.list('courses')
        //     .do(console.log)
        //     .subscribe(
        //     data => this.courses = data
        //     );

        this.courses$ = this.coursesService.findAllCourses();
        // .subscribe(
        //     (data) => {
        //         this.courses = data;
        //     }
        // );

        // this.db.list('lessons', {
        //     query: {
        //         orderByKey: true,
        //         limitToLast: 10
        //     }
        // })
        //     .do(console.log)
        //     .subscribe(
        //     data => this.latestLessons = data
        //     );

        this.latestLessons$ = this.coursesService.findLatestLessons();
        // .subscribe(
        //     (data) => {
        //         this.latestLessons = data;
        //     }
        // );
    }

}
