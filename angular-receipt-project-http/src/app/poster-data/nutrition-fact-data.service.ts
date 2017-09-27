import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { NUTRITIONIX_CONFIG, NUTRITIONIX_API, NUTRITIONIX_API_ITEM_SEARCH } from '../shared/config';
import { NutritionSearchResult } from '../shared/nutritionsearchresult';

@Injectable()
export class NutritionFactDataService {

  private itemSearchResultSubject = new BehaviorSubject<Object>({});
  itemSearchResult$: Observable<Object> = this.itemSearchResultSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  /**
   * Seach a specific item
   * const req = new HttpRequest('GET', NUTRITIONIX_API_ITEM_SEARCH.url, {
      headers: new HttpHeaders()
        .append(NUTRITIONIX_CONFIG.appIdHeader, NUTRITIONIX_CONFIG.appId)
        .append(NUTRITIONIX_CONFIG.appKeyHeader, NUTRITIONIX_CONFIG.appKey),
      reportProgress: true,
      responseType: 'json',
      params: new HttpParams().set('nix_item_id', itemId)
    });
    return this.httpClient.request(req).do(
      (result) => {
        this.itemSearchResultSubject.next(result);
      }
    ).publishLast().refCount();
   * @param {string} itemId
   * @returns {Observable<any>}
   * @memberof PosterDataService
   */
  seachItem(itemId: string): Observable<Object> {
    const tr = sessionStorage.getItem(itemId);
    if (tr) {
      console.log('already found');
      return this.itemSearchResultSubject.do(
        () => {
          this.itemSearchResultSubject.next(JSON.parse(tr));
        }
      ).publishLast().refCount();
    } else {
      return this.httpClient.get<NutritionSearchResult>(NUTRITIONIX_API_ITEM_SEARCH.url, {
        headers: new HttpHeaders()
          .append(NUTRITIONIX_CONFIG.appIdHeader, NUTRITIONIX_CONFIG.appId)
          .append(NUTRITIONIX_CONFIG.appKeyHeader, NUTRITIONIX_CONFIG.appKey),
        params: new HttpParams().set('nix_item_id', encodeURIComponent(itemId)),
        observe: 'body',
        responseType: 'json'
      }).map(
          (response) => {
            return response;
          }
        ).do(
          (result) => {
            sessionStorage.setItem(itemId, JSON.stringify(result));
            this.itemSearchResultSubject.next(result);
          }
        ).publishLast().refCount();
    }
  }

}
