import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { Item } from 'src/app/items/interfaces/item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  favList:Item[] = [];
  cartList: Item[] = [];

  constructor(private favoritesService: FavoritesService, private cartService: CartService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.favList = this.favoritesService.list;
    this.cartList = this.cartService.list;
  }

  delFromFavorites(item:Item){
    const index = this.favoritesService.list.findIndex((i) => {
      return i.id === item.id;
  });
    this.favoritesService.list.splice(index,1);
    this._snackBar.open(`${item.name} was deleted from your favorites`, 'OK', {
      duration: 2000,
    });
}
}
