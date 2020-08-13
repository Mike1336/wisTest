import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FavoritesService } from '../../../favorites/services/favorites.service';
import { CartService } from '../../../cart/services/cart.service';
import { Item } from '../../../items/interfaces/item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public favList: Item[] = [];
  public cartList = [];
  public totalPrice: number = 0;

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
  ) { }

  public ngOnInit(): void {
    this.favList = this.favoritesService.list;
    this.cartList = this.cartService.list;
  }

  public updateTotalPrice(): void {
    this.cartService.updateTotalPrice();
  }

  public delFromFavorites(item: Item): void {
    this.favoritesService.update(item);
    this._snackBar.open(`${item.name} was deleted from your favorites`, 'OK', {
      duration: 2000,
    });
  }
  public delFromCart(item: Item): void {
    this.cartService.update(item);
    this._snackBar.open(`${item.name} successfully deleted from your cart`, 'OK', {
      duration: 2000,
    });
  }
}
