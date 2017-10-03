import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { NUTRITIONIX_API, NUTRITIONIX_API_ITEM_SEARCH } from '../shared/config';
import { NutritionSearchResult } from '../shared/nutritionsearchresult';

const BLANK: NutritionSearchResult = {
  init: true,
  branded: null,
  common: null,
};

@Injectable()
export class PosterDataService {

  private resultSubject = new BehaviorSubject<NutritionSearchResult>(BLANK);
  private itemSearchResultSubject = new BehaviorSubject<Object>({});
  results$: Observable<NutritionSearchResult> = this.resultSubject.asObservable();
  itemSearchResult$: Observable<{}> = this.itemSearchResultSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  search(query: string): Observable<any> {
    return this.httpClient.get<NutritionSearchResult>(NUTRITIONIX_API.url, {
      // headers: new HttpHeaders()
      //   .set(NUTRITIONIX_API.appIdHeader, NUTRITIONIX_API.appId)
      //   .set(NUTRITIONIX_API.appKeyHeader, NUTRITIONIX_API.appKey),
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

  seachItem(itemId: string) {
    const req = new HttpRequest('GET', NUTRITIONIX_API_ITEM_SEARCH.url, {
      reportProgress: true,
      params: new HttpParams().set('nix_item_id', itemId)
    });
    return this.httpClient.request(req).do(
      (result) => {
        this.itemSearchResultSubject.next(result);
      }
    ).publishLast().refCount();
  }

}
