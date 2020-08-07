import { NgModule } from '@angular/core';
import { CoreModule } from "./core/core.module";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ItemsRoutingModule } from './items/items-routing.module';
import { CartRoutingModule } from './cart/cart-routing.module';
import { FavoritesRoutingModule } from './favorites/favorites-routing.module';
import { ItemsModule } from "./items/items.module";
import { LayoutModule } from './layout/header.module';
import { CartModule } from './cart/cart.module';
import { FavoritesModule } from './favorites/favorites.module';

import { AppComponent } from "./app.component";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
