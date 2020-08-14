import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FavoritesService } from '../../services/favorites.service';
import { CartService } from '../../../cart/services/cart.service';
import { Item } from '../../../items/interfaces/item';

import { DeleteConfirmingComponent } from './../../../layout/components/delete-confirming/delete-confirming.component';
import { ItemDetailsComponent } from './../../../layout/components/item-details/item-details.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {

  public list: Item[] = [];
  constructor(
    private favoritesService: FavoritesService,
    public cartService: CartService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.list = this.favoritesService.list;
  }
  public openDialog(item: Item): void {
    const confirmModal = this.dialog.open(DeleteConfirmingComponent, { // отправление данных в компонент модалки после открытия
      data: {
        id: item.id,
        name: item.name,
      },
    });
    confirmModal.afterClosed().subscribe((result) => { // получение данных после закрытия
      if (result) {
        this.delFromFavorites(result.id, result.name);
      }
    });
  }
  public openItemDetails(item: Item): void {
    this.dialog.open(ItemDetailsComponent, { // отправление данных в компонент модалки после открытия
      data: {
        id: item.id,
        img: item.img,
        name: item.name,
        price: item.price,
      },
    });
  }
  public delFromFavorites(id: number, name: string): void {
    const index = this.favoritesService.list.findIndex((i) => {
      return i.id === id;
    });
    this.favoritesService.list.splice(index, 1);
    this._snackBar.open(`${name} was deleted from your favorites`, 'OK', {
      duration: 2000,
    });
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
  public checkItemForCart(item: Item): boolean { // для отображения иконки товаров из корзины
    return this.cartService.check(item);
  }

}
