import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ItemsModule } from './items/items.module';
import { LayoutModule } from './layout/layout.module';
import { CartModule } from './cart/cart.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    LayoutModule,
    ItemsModule,
    CartModule,
    FavoritesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
