import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Rates, Response } from 'src/app/Interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiUri: string = 'https://open.er-api.com/v6/latest';

  constructor(private http: HttpClient) { }

  getCurrentRate(input: string): Observable<Response> {

    return this.http
      .get<Response>(this.apiUri + '/' + input)
      .pipe(map((res) => {
        return res;
      })) 
    }
}