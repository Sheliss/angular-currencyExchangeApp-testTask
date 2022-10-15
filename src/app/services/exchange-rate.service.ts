import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Currencies } from 'src/app/Interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiUri: string = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';

  constructor(private http: HttpClient) { }

  getCurrentRate(input: string, output: string): Observable<number> {
    return this.http
      .get<Currencies>(this.apiUri + '/' + input + '/' + output + '.json')
      .pipe(map((res) => {
        return this.responseCurrencyCheck(res)!;
      }))
  }

  private responseCurrencyCheck(res: Currencies) {
    if('uah' in res) {
      return res.uah;
    }
    if('usd' in res) { 
      return res.usd
    }
    if('eur' in res) { 
      return res.eur
    }
    return -1
  }
  
}
