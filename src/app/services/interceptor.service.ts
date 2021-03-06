import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, tap } from 'rxjs';
import { AccountService } from './account.service';
import { ConfigService } from './config.service';
import { Stock } from './stocks.model';

@Injectable({
  providedIn: 'root'
})
export class StocksInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone();
    request.headers.append('Accept', 'application/json');

    return next.handle(request).pipe(tap({
      next: event => {
        if (event instanceof HttpResponse && event.url === ConfigService.
          get('api')) {
          const stocks = event.body as Array<Stock>;
          stocks.forEach(stock => {
            this.accountService.stocks.map(item => {
              if (stock.symbol === item.symbol) {
                item.price = stock.price;
                item.change = ((stock.price * 100) - (item.cost * 100)) / 100;
              }
            });
          });
          this.accountService.calculateValue();
          return stocks;
        }
        return EMPTY;
      },
      error: err => { console.error(err); },
    }));

  }
}
