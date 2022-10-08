import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';
import { Currencies } from 'src/app/Interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  rateUSD: number | undefined = 0;
  rateEUR: number | undefined = 0;

  constructor(private exchangeRate: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRate.getCurrentRate('uah', 'usd').subscribe((res: Currencies) => (this.rateUSD = res.usd));
    this.exchangeRate.getCurrentRate('uah', 'eur').subscribe((res: Currencies) => (this.rateEUR = res.eur));
  }

}
