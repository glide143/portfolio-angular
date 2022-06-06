import { Component, Input } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {
  @Input() stocks: any;
  total: number = 100;

  constructor(private accountService: AccountService) { }

  buy(stock: any): void {
    this.accountService.purchase(stock);
  }

}
