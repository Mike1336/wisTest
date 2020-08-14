import { Component, OnInit, Inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FavoritesService } from '../../../favorites/services/favorites.service';
import { CartService } from '../../../cart/services/cart.service';
import { Item } from '../../../items/interfaces/item';

@Component({
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Item,
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
  }

  public addToFavotire(item: Item): void {
    const index = this.favoritesService.update(item);
    if (index >= 0) {
      this._snackBar.open(`${item.name} was deleted from your favorites`, 'OK', {
        duration: 2000,
      });
    } else {
      this._snackBar.open(`${item.name} was added to your favorites`, 'OK', {
        duration: 2000,
      });
    }
  }
  public addToCart(item: Item): void {
    const index = this.cartService.update(item);
    if (index >= 0) {
      this._snackBar.open(`${item.name} successfully deleted from your cart`, 'OK', {
        duration: 2000,
      });
    } else {
      this._snackBar.open(`${item.name} successfully added to your cart`, 'OK', {
        duration: 2000,
      });
    }
  }
  public checkFavorite(item: Item): boolean { // для отображения иконки избранных товаров
    const index = this.favoritesService.list.findIndex((i: Item) => {
      return i.id === item.id;
    });

    return index >= 0;
  }
  public checkCart(item: Item): boolean { // для отображения иконки избранных товаров
    const index = this.cartService.list.findIndex((i: Item) => {
      return i.id === item.id;
    });

    return index >= 0;
  }

}
