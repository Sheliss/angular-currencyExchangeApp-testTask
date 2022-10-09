import { Component, OnInit } from '@angular/core';
import { DropdownItem, Currencies } from 'src/app/Interfaces';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

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
    this.exchangeRate.getCurrentRate(input, output).subscribe((res: Currencies) => (this.CurrentRate = this.responseCurrencyCheck(res)!));
  }

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

  countOutput() {
    this.getCurrentRate(this.inputCurrency, this.outputCurrency);
    this.outputValue = parseFloat((this.inputValue * this.CurrentRate).toFixed(2));
  }

  countInput() {
    this.getCurrentRate(this.inputCurrency, this.outputCurrency);
    this.inputValue  = parseFloat((this.outputValue / this.CurrentRate).toFixed(2));
  }


  responseCurrencyCheck(res: Currencies) {
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
