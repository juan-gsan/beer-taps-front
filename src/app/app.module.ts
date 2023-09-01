import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DispenserService } from './services/dispenser.service';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BeerModule } from './beer/beer.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BeerModule,
    LayoutModule,
    CommonModule,
  ],
  providers: [DispenserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
