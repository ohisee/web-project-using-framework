import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NutritionModel } from '../shared/nutrition.model';
import { EDAMAN_NUTRITION_SEARCH_API_CONFIG } from '../shared/config';

@Injectable()
export class NutritionDataService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Search nutrition of recipe
   * @param {string} query
   * @returns {Observable<NutritionModel>}
   * @memberof NutritionDataService
   */
  search(query: string): Observable<NutritionModel> {
    return this.httpClient.get<NutritionModel>(EDAMAN_NUTRITION_SEARCH_API_CONFIG.url, {
      params: new HttpParams()
        .append('query', encodeURIComponent(query))
        .append('from', '0')
        .append('to', '10'),
      observe: 'body',
      responseType: 'json'
    }).map(
        (response) => {
          return response;
        }
      ).publishLast().refCount();
  }

}
