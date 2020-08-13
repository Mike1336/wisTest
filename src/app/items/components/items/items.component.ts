import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


import { ItemsService } from '../../services/items.service';
import { CartService } from '../../../cart/services/cart.service';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { ModalComponent } from '../modal/modal.component';
import { Item } from '../../interfaces/item';


@Component({
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {

  public items: Item[] = [];
  public cart: Item[] = [];
  public favorites: Item[] = [];
  constructor(
    private itemsService: ItemsService,
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.getItems();
    this.favorites = this.favoritesService.list;
    this.cart = this.cartService.list;
  }

  public getItems(): void {
    this.itemsService.getItems()
    .subscribe((items) => this.items = items);
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

  public checkItemForFavorite(item: Item): boolean { // для отображения иконки избранных товаров
    return this.favoritesService.check(item);
  }

  public checkItemForCart(item: Item): boolean { // для отображения иконки товаров из корзины
    return this.cartService.check(item);
  }

  public openDialog(item: Item): void {
    this.dialog.open(ModalComponent, { // отправление данных в компонент модалки после открытия
      data: {
        id: item.id,
        img: item.img,
        name: item.name,
        price: item.price,
      },
    });
  }
}
