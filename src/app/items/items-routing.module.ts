import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsComponent } from './components/items/items.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', component: ItemsComponent },
    { path: 'items', component: ItemsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
    export class ItemsRoutingModule {

}
