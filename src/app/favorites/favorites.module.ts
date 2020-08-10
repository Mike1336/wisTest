import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from "@angular/material/snack-bar";


import { FavoritesComponent } from './components/favorites/favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    FavoritesComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    FavoritesRoutingModule
  ],
})
export class FavoritesModule { }
