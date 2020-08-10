import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'items',
      },
      {
        path: 'items',
        loadChildren: () => import('../app/items/items.module').then(m => m.ItemsModule)
      },
      {
        path: 'cart',
        loadChildren: () => import  ('../app/cart/cart.module').then(m => m.CartModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import  ('../app/favorites/favorites.module').then(m => m.FavoritesModule)
      },
    ],
    
  },
  {
    path: '**',
    redirectTo: 'items'
}      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
