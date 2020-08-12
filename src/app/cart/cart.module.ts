import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CartComponent } from './components/cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    CartComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatInputModule,
    MatDialogModule,
    CartRoutingModule
  ],
})
export class CartModule { }
