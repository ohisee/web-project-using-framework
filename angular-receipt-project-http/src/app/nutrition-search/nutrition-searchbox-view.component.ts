import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { PosterDataService } from '../poster-data/poster-data.service';
import { NutritionSearchResult } from '../shared/nutritionsearchresult';


@Component({
  selector: 'app-nutrition-searchbox-view',
  templateUrl: './nutrition-searchbox-view.component.html',
  styleUrls: ['./nutrition-searchbox-view.component.css']
})
export class NutritionSearchboxViewComponent implements OnInit {

  private readonly MIN_LEN = 2;

  results$: Observable<NutritionSearchResult>;

  constructor(private posterDataService: PosterDataService) { }

  ngOnInit() {
    this.results$ = this.posterDataService.results$;
  }

  onClick(query: string) {
    if (query && query.length > this.MIN_LEN) {
      this.posterDataService.search(query).subscribe(
        () => {},
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
