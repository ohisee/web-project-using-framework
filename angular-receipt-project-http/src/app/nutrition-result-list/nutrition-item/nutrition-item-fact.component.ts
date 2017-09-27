import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { NutritionFact } from '../../shared/nutritionfact';
import * as fromApp from '../../store/app.reducers';
import * as fromNutrition from '../../nutrition-search/store/nutrition.reducers';
import * as NutritionActions from '../../nutrition-search/store/nutrition.actions';
import { NutritionFactDataService } from '../../poster-data/nutrition-fact-data.service';

@Component({
  selector: 'app-nutrition-item-fact',
  templateUrl: './nutrition-item-fact.component.html',
  styleUrls: ['./nutrition-item-fact.component.css']
})
export class NutritionItemFactComponent implements OnInit {

  @Input() itemId: string;

  nutritionFact: NutritionFact;
  nutritionFact$: Observable<Object>;

  constructor(private nutritionFactDataService: NutritionFactDataService) { }

  ngOnInit() {
    console.log('nutrition facts');
    // this.nutritionFact$ = this.store.select('nutritionFact');
    this.nutritionFact$ = this.nutritionFactDataService.itemSearchResult$;
  }
  /*
  .subscribe(
      (result: fromNutrition.State) => {
        if (result.nutritionFacts) {
          this.nutritionFact = new NutritionFact();
          const n = result.nutritionFacts['foods'][0];
          console.log('foods', n);
          this.nutritionFact.serving_qty = { key: 'Serving Qty', value: n.serving_qty };
          this.nutritionFact.serving_unit = { key: 'Serving Unit', value: n.serving_unit };
          this.nutritionFact.nf_calories = { key: 'Calories', value: n.nf_calories };
          this.nutritionFact.nf_cholesterol = { key: 'Cholesterol', value: n.nf_cholesterol };
          this.nutritionFact.nf_dietary_fiber = { key: 'Dietary Fiber', value: n.nf_dietary_fiber };
          this.nutritionFact.nf_saturated_fat = { key: 'Saturated Fat', value: n.nf_saturated_fat };
          this.nutritionFact.nf_sodium = { key: 'Sodium', value: n.nf_sodium };
          this.nutritionFact.nf_sugars = { key: 'Sugars', value: n.nf_sugars };
          this.nutritionFact.nf_protein = { key: 'Protein', value: n.nf_protein };
          console.log(this.nutritionFact);
        }
        return this.nutritionFact;
      }
    );
   */

}
