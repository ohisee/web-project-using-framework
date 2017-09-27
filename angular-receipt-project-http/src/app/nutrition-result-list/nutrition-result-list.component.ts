import { Component, OnInit, Input } from '@angular/core';
import { NutritionSearchResult } from '../shared/nutritionsearchresult';

@Component({
  selector: 'app-nutrition-result-list',
  templateUrl: './nutrition-result-list.component.html',
  styleUrls: ['./nutrition-result-list.component.css']
})
export class NutritionResultListComponent implements OnInit {

  @Input() results: NutritionSearchResult;

  @Input() query: string;

  constructor() { }

  ngOnInit() { }

}
