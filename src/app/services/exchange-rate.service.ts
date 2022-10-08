import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Currencies } from 'src/app/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiUri: string = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';

  constructor(private http: HttpClient) { }

  getCurrentRate(input: string, output: string): Observable<Currencies> {
    return this.http
      .get<Currencies>(this.apiUri + '/' + input + '/' + output + '.json')
  }
}
