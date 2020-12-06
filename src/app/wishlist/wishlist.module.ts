import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './components/wishlist/wishlist.component';


@NgModule({
  declarations: [
    WishlistComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    // Angular Material
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    // Own
    WishlistRoutingModule,
  ],
})
export class WishlistModule { }
