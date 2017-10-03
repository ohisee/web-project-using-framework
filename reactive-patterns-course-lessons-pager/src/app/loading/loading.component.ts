import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading$: Observable<boolean>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loading$ = this.router.events.map(
      (event) => {
        const tv = event instanceof NavigationStart || event instanceof RoutesRecognized;
        console.log('Event to loading', tv);
        return tv;
      }
    );
  }

}
