import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  rateUSD: number = -1;
  rateEUR: number = -1;

  constructor(private exchangeRate: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRate.getCurrentRate('uah', 'usd').subscribe((res: number) => this.rateUSD = res);
    this.exchangeRate.getCurrentRate('uah', 'eur').subscribe((res: number) => this.rateEUR = res);
  }

}
