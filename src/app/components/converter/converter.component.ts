import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

currencyList: object[] = [
    {
      value: 'usd',
      name: 'USD - US Dollar'
    },
    {
      value: 'eur',
      name: 'EUR - Euro'
    },
    {
      value: 'uah',
      name: 'UAH - Ukrainian Hryvnia'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
