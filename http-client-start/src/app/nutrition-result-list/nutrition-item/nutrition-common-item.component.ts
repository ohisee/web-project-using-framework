import { Component, OnInit, Input } from '@angular/core';
import { Nutrition } from '../../shared/nutritionsearchresult';

@Component({
  selector: 'app-nutrition-common-item',
  templateUrl: './nutrition-common-item.component.html',
  styleUrls: ['./nutrition-common-item.component.css']
})
export class NutritionCommonItemComponent implements OnInit {

  @Input() nutrition: Nutrition;

  constructor() {}

  ngOnInit() {
  }

}
