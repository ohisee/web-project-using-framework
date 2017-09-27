import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Nutrition } from '../../shared/nutritionsearchresult';
import { NutritionFact } from '../../shared/nutritionfact';
import * as fromApp from '../../store/app.reducers';
import * as fromNutrition from '../../nutrition-search/store/nutrition.reducers';
import * as NutritionActions from '../../nutrition-search/store/nutrition.actions';
import { NutritionFactDataService } from '../../poster-data/nutrition-fact-data.service';

@Component({
  selector: 'app-nutrition-item',
  templateUrl: './nutrition-item.component.html',
  styleUrls: ['./nutrition-item.component.css'],
  providers: [NutritionFactDataService]
})
export class NutritionItemComponent implements OnInit {

  @Input() nutrition: Nutrition;
  displayNutritionFacts = false;

  constructor(private nutritionFactDataService: NutritionFactDataService) { }

  ngOnInit() {
  }

  onClick() {
    this.displayNutritionFacts = !this.displayNutritionFacts;
    if (this.displayNutritionFacts) {
      console.log('search item');
      // this.store.dispatch(
      //   new NutritionActions.GetNutritionFactsAction(this.nutrition.nix_item_id));
      this.nutritionFactDataService.seachItem(this.nutrition.nix_item_id).take(1).subscribe();
    }
  }

}
