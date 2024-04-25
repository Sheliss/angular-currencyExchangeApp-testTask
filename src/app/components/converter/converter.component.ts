import { Component, OnInit } from '@angular/core';
import { Currencies, DropdownItem, Response } from 'src/app/Interfaces';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

////////////////////////////////
//List of currencies
//New currencies can be added here

//New currency must be written in the array below, 
//function in the service, as well as in the interface

currencyList: DropdownItem[] = [
  {
    value: 'UAH',
    name: 'UAH - Ukrainian Hryvnia'
  },
   {
    value: 'USD',
    name: 'USD - US Dollar'
  },
  {
    value: 'PLN',
    name: 'PLN - Polish złoty'
  },
  {
    value: 'CAD',
    name: 'CAD - Canadian Dollar'
  },
  {
    value: 'AUD',
    name: 'AUD - Australian Dollar'
  },
  {
    value: 'GBP',
    name: 'GBP - Pound Sterling'
  },
  {
    value: 'EUR',
    name: 'EUR - Euro'
  }
  ];

  ////////////////////////////////


  inputCurrency: string = this.currencyList[0].value;
  outputCurrency: string = this.currencyList[this.currencyList.length - 1].value;


  lastInput: string = 'none';
  lastOutput: string = 'none';

  inputValue: number = 1;
  outputValue: number = 0;

  private _currentRate: Currencies = {};

  get CurrentRate(): Currencies {
    return this._currentRate;
  }

  set CurrentRate(value: Currencies) {
    this._currentRate = value;
    this.countOutput();
  }

  constructor(private exchangeRate: ExchangeRateService) { }

  ngOnInit(): void {
    this.lastInput = this.inputCurrency;
    this.lastOutput = this.outputCurrency;

    this.getCurrentRate(this.inputCurrency);
  }

  getCurrentRate(input: string) {
    this.exchangeRate.getCurrentRate(input).subscribe((res: Response) => this.CurrentRate = res.rates);
  }

  //Checking currency change and also swap currencies if the same one is selected as in another select

  inputChange() {
    if(this.inputCurrency === this.outputCurrency) {
      this.outputCurrency = this.lastInput;
      this.lastInput = this.inputCurrency;
      this.lastOutput = this.outputCurrency;
      this.getCurrentRate(this.inputCurrency);
      return;
    }
    this.getCurrentRate(this.inputCurrency);
    this.lastInput = this.inputCurrency;
    this.lastOutput = this.outputCurrency;
  }

  outputChange() {
    if(this.inputCurrency === this.outputCurrency) {
      this.inputCurrency = this.lastOutput;
      this.lastInput = this.inputCurrency;
      this.lastOutput = this.outputCurrency;
      this.getCurrentRate(this.inputCurrency);
      return;
    }
    this.countOutput();
    this.lastInput = this.inputCurrency;
    this.lastOutput = this.outputCurrency;
  }

  // Calculation at the rate of selected currencies

  countOutput() {
    if(this.inputValue < 0) {
      this.inputValue *= -1;
    }

    this.outputValue = Number((this.inputValue * this.CurrentRate[this.outputCurrency]).toFixed(2));
  }

  countInput() {
    if(this.outputValue < 0) {
      this.outputValue *= -1;
    }

    this.inputValue = Number((this.outputValue / this.CurrentRate[this.outputCurrency]).toFixed(2));
  }

  //Exchange currencies and values at the button click

  onSwap() {
    const tempValue: number = this.inputValue;
    this.inputCurrency = this.outputCurrency;
    this.outputCurrency = this.lastInput;

    this.getCurrentRate(this.inputCurrency);

    this.lastInput = this.inputCurrency;
    this.lastOutput = this.outputCurrency;

    this.inputValue = this.outputValue;
    this.outputValue = tempValue;
  }

}
