import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { NUTRITIONIX_CONFIG, NUTRITIONIX_API, NUTRITIONIX_API_ITEM_SEARCH } from '../shared/config';
import { NutritionSearchResult } from '../shared/nutritionsearchresult';

const BLANK: NutritionSearchResult = {
  init: true,
  branded: null,
  common: null,
};

@Injectable()
export class PosterDataService {

  private resultSubject = new BehaviorSubject<NutritionSearchResult>(BLANK);
  results$: Observable<NutritionSearchResult> = this.resultSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  /**
   * Call to search
   * Intercept using HTTP interceptor
   * @see poster.interceptor.ts
   * @param {string} query
   * @returns {Observable<any>}
   * @memberof PosterDataService
   */
  search(query: string): Observable<any> {
    return this.httpClient.get<NutritionSearchResult>(NUTRITIONIX_API.url, {
      headers: new HttpHeaders()
        .append(NUTRITIONIX_CONFIG.appIdHeader, NUTRITIONIX_CONFIG.appId)
        .append(NUTRITIONIX_CONFIG.appKeyHeader, NUTRITIONIX_CONFIG.appKey),
      params: new HttpParams().set('query', encodeURIComponent(query)),
      observe: 'body',
      responseType: 'json'
    }).map(
        (response) => {
          return response;
        }
      ).do(
        (result) => {
          this.resultSubject.next(result);
        }
      ).publishLast().refCount();
  }

}
