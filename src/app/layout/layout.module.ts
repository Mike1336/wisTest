import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { HeaderComponent } from './components/header/header.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { DeleteConfirmingComponent } from './components/delete-confirming/delete-confirming.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ItemDetailsComponent,
    DeleteConfirmingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class LayoutModule {

}
