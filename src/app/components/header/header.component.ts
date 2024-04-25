import { Component, OnInit } from '@angular/core';
import { Response, Currencies } from 'src/app/Interfaces';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  rateUSD: number = -1;
  rateEUR: number = -1;
  test: any;

  constructor(private exchangeRate: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRate.getCurrentRate('uah').subscribe((res: Response) => {this.rateUSD = res.rates['USD']; this.rateEUR = res.rates['EUR']});
  }

}
