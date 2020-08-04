import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { CartComponent } from './cart/cart.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [      
{ path: '', component: ItemsComponent },
{ path: 'items', component: ItemsComponent },
{ path: 'items/:itemId', component: ItemsComponent },
{ path: 'cart', component: CartComponent },
{ path: 'favorites', component: FavoritesComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
