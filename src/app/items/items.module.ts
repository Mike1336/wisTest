import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { ItemsComponent } from './components/items/items.component';



@NgModule({
  declarations: [
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class ItemsModule { }
