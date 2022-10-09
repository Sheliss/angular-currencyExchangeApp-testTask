import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';
import { Currencies } from 'src/app/Interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  rateUSD: number = 0;
  rateEUR: number = 0;

  constructor(private exchangeRate: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRate.getCurrentRate('uah', 'usd').subscribe((res: Currencies) => (this.rateUSD = this.exchangeRate.responseCurrencyCheck(res)!));
    this.exchangeRate.getCurrentRate('uah', 'eur').subscribe((res: Currencies) => (this.rateEUR = this.exchangeRate.responseCurrencyCheck(res)!));
  }

}
