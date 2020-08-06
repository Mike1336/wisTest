import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports:[
    HeaderComponent
  ]
})
export class LayoutModule { }
