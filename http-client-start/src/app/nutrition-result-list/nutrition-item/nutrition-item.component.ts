import { Component, OnInit, Input } from '@angular/core';
import { Nutrition } from '../../shared/nutritionsearchresult';

@Component({
  selector: 'app-nutrition-item',
  templateUrl: './nutrition-item.component.html',
  styleUrls: ['./nutrition-item.component.css']
})
export class NutritionItemComponent implements OnInit {

  @Input() nutrition: Nutrition;

  display: boolean;

  constructor() { }

  ngOnInit() { }

  onClick() {
    this.display = !this.display;
  }

}
