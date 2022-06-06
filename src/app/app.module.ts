import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvestmentComponent } from './investment/investment.component';
import { StocksComponent } from './stocks/stocks.component';
import { TickerComponent } from './ticker/ticker.component';
import { ClarityModule } from '@clr/angular';
import { LocalStorageService } from './services/local-storage.service';
import { CurrencyPipe } from '@angular/common';
import { AlertService } from './services/alert.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountService } from './services/account.service';
import { StocksInterceptor } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    InvestmentComponent,
    StocksComponent,
    TickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClarityModule,
    HttpClientModule
  ],
  providers: [LocalStorageService,
    CurrencyPipe,
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: StocksInterceptor, multi: true },
    AlertService],

  bootstrap: [AppComponent]
})
export class AppModule { }
