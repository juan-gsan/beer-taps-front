import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerListComponent } from './beer.list/beer.list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BeerListComponent],
  imports: [CommonModule, RouterModule],
})
export class BeerModule {}
