import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Observable, ReplaySubject } from 'rxjs';

import { ItemsService } from '../../services/items.service';
import { CartService } from '../../../cart/services/cart.service';
import { IItem } from '../../interfaces/item';

import { Wishlist } from './../../../wishlist/wishlist/wishlist';
import { WishlistService } from './../../../wishlist/services/wishlist.service';
import { Cart } from './../../../cart/classes/cart';
import { ItemDetailsComponent } from './../../../layout/components/item-details/item-details.component';


@Component({
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnDestroy {

  private destroy$ = new ReplaySubject<any>(1);

  constructor(
    public dialog: MatDialog,
    private _itemsService: ItemsService,
    private _wishlistService: WishlistService,
    private _cartService: CartService,
    private _snackBar: MatSnackBar,
    ) { }

  public get items$(): Observable<IItem[]> {
    return this._itemsService.getItems();
  }

  public get cart(): Cart {
    return this._cartService.cart;
  }

  public get wishlist(): Wishlist {
    return this._wishlistService.wishlist;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public checkInWishlist(item: IItem): void {
    this.wishlist.updateList(item);

    if (this.wishlist.isExist(item)) {
      this._snackBar.open(`${item.name} was successfully deleted from your wislist`, 'OK', {
        duration: 2000,
      });

      return;
    }
    this._snackBar.open(`${item.name} was successfully added to your wishlist`, 'OK', {
      duration: 2000,
    });
  }


  public checkInCart(item: IItem): void {
    this.cart.updateList(item);

    if (this.cart.isExist(item)) {
      this._snackBar.open(`${item.name} was successfully deleted from your cart`, 'OK', {
        duration: 2000,
      });

      return;
    }
    this._snackBar.open(`${item.name} was successfully added to your cart`, 'OK', {
      duration: 2000,
    });
  }

  public checkItemForFavorite(item: IItem): boolean {
    // для отображения иконки избранных товаров
    return this.wishlist.isExist(item);
  }

  public checkItemForCart(item: IItem): boolean {
    // для отображения иконки товаров из корзины
    return this.cart.isExist(item);
  }

  public openDialog(item: IItem): void {
     // отправление данных в компонент модалки после открытия
    this.dialog.open(ItemDetailsComponent, {
      data: {
        id: item.id,
        img: item.img,
        name: item.name,
        price: item.price,
      },
    });
  }

}
