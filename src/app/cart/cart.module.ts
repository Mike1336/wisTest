import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { CartComponent } from './components/cart/cart.component';



@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class CartModule { }
