import { Component, OnInit } from '@angular/core';
import { DropdownItem, Currencies } from 'src/app/Interfaces';
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
    value: 'uah',
    name: 'UAH - Ukrainian Hryvnia'
  },
   {
    value: 'usd',
    name: 'USD - US Dollar'
  },
  {
    value: 'eur',
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

  private _currentRate: number = 0;

  get CurrentRate(): number {
    return this._currentRate;
  }

  set CurrentRate(value: number) {
    this._currentRate = value;
    this.countOutput();
  }

  constructor(private exchangeRate: ExchangeRateService) { }

  ngOnInit(): void {
    this.lastInput = this.inputCurrency;
    this.lastOutput = this.outputCurrency;

    this.getCurrentRate(this.inputCurrency, this.outputCurrency);
  }

  getCurrentRate(input: string, output: string) {
    this.exchangeRate.getCurrentRate(input, output).subscribe((res: Currencies) => (this.CurrentRate = this.exchangeRate.responseCurrencyCheck(res)!));
  }

  //Checking currency change and also swap currencies if the same one is selected as in another select

  inputChange() {
    if(this.inputCurrency === this.outputCurrency) {
      this.outputCurrency = this.lastInput;
      this.lastInput = this.inputCurrency;
      this.lastOutput = this.outputCurrency;
      this.getCurrentRate(this.inputCurrency, this.outputCurrency);
      return;
    }
    this.getCurrentRate(this.inputCurrency, this.outputCurrency);
    this.lastInput = this.inputCurrency;
    this.lastOutput = this.outputCurrency;
  }

  outputChange() {
    if(this.inputCurrency === this.outputCurrency) {
      this.inputCurrency = this.lastOutput;
      this.lastInput = this.inputCurrency;
      this.lastOutput = this.outputCurrency;
      this.getCurrentRate(this.inputCurrency, this.outputCurrency);
      return;
    }
    this.getCurrentRate(this.inputCurrency, this.outputCurrency);
    this.lastInput = this.inputCurrency;
    this.lastOutput = this.outputCurrency;
  }

  // Calculation at the rate of selected currencies

  countOutput() {
    if(this.inputValue < 0) {
      this.inputValue *= -1;
    }

    this.outputValue = Number((this.inputValue * this.CurrentRate).toFixed(2));
  }

  countInput() {
    if(this.outputValue < 0) {
      this.outputValue *= -1;
    }

    this.inputValue = Number((this.outputValue / this.CurrentRate).toFixed(2));
  }

  //Exchange currencies and values at the button click

  onSwap() {
    const tempValue: number = this.inputValue;
    this.inputCurrency = this.outputCurrency;
    this.outputCurrency = this.lastInput;

    this.getCurrentRate(this.inputCurrency, this.outputCurrency);

    this.lastInput = this.inputCurrency;
    this.lastOutput = this.outputCurrency;

    this.inputValue = this.outputValue;
    this.outputValue = tempValue;
  }

}
