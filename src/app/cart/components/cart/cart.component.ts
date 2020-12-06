import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartService } from '../../services/cart.service';
import { DeleteConfirmingComponent } from '../../../layout/components/delete-confirming/delete-confirming.component';

import { Wishlist } from './../../../wishlist/wishlist/wishlist';
import { WishlistService } from './../../../wishlist/services/wishlist.service';
import { IItem, ICartItem } from './../../../items/interfaces/item';
import { Cart } from './../../classes/cart';
import { ItemDetailsComponent } from './../../../layout/components/item-details/item-details.component';


@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private _cartService: CartService,
    public _wishlistService: WishlistService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    ) { }

  public get cart(): Cart {
    return this._cartService.cart;
  }

  public get wishlist(): Wishlist {
    return this._wishlistService.wishlist;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public checkQuantityOfItem(item: ICartItem): void {
    if (item.quantity > 0) {
      return;
    }
    this.openDeleteConfirming(item);
  }

  public deleteItem(item: IItem & ICartItem): void {
    this.cart.updateList(item);
    this._snackBar.open(`${name} was deleted from your cart`, 'OK', {
      duration: 2000,
    });
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

  public checkItemForFav(item: IItem): boolean { // для отображения иконки товаров из корзины
    return this.wishlist.isExist(item);
  }
  public openDeleteConfirming(item: ICartItem): void {
    // отправление данных в компонент модалки после открытия
    const confirmModal = this.dialog.open(DeleteConfirmingComponent, {
      data: {
        id: item.id,
        name: item.name,
      },
    });
    confirmModal.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => { // получение данных после закрытия
        if (!result) {
          return;
        }
        this.deleteItem(item);
      });
  }
  public openItemDetails(item: IItem): void {
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
