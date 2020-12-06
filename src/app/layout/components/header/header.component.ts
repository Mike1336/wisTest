import { Component, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ReplaySubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartService } from '../../../cart/services/cart.service';
import { IItem } from '../../../items/interfaces/item';

import { Wishlist } from './../../../wishlist/wishlist/wishlist';
import { WishlistService } from './../../../wishlist/services/wishlist.service';
import { ICartItem } from './../../../items/interfaces/item';
import { Cart } from './../../../cart/classes/cart';
import { DeleteConfirmingComponent } from './../delete-confirming/delete-confirming.component';
import { ItemDetailsComponent } from './../item-details/item-details.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {

  private destroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    public dialog: MatDialog,
    private _wishlistService: WishlistService,
    private _cartService: CartService,
    private _snackBar: MatSnackBar,
  ) { }

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

  public checkQuantityOfItem(item: ICartItem): void {
    if (item.quantity > 0) {
      return;
    }
    this.openDeleteConfirmingFromCart(item);
  }

  public openDeleteConfirmingFromCart(item: ICartItem): void {
    // отправление данных в компонент модалки после открытия
    const confirmModal = this.dialog.open(DeleteConfirmingComponent, {
      data: {
        id: item.id,
        name: item.name,
      },
    });
    confirmModal.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        )
      .subscribe((result) => { // получение данных после закрытия
        if (!result) {
          return;
        }
        this.deleteFromCart(item);
      });
  }

  public openDeleteConfirmingFromWishlist(item: IItem): void {
    // отправление данных в компонент модалки после открытия
    const confirmModal = this.dialog.open(DeleteConfirmingComponent, {
      data: {
        id: item.id,
        name: item.name,
      },
    });
    confirmModal.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        )
      .subscribe((result) => { // получение данных после закрытия
        if (!result) {
          return;
        }
        this.deleteFromWishlist(item);
      });
  }

  public openItemDetails(item: IItem & ICartItem): void {
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

  public deleteFromWishlist(item: IItem): void {
    this.wishlist.updateList(item);
    this._snackBar.open(`${name} was successfully deleted from your wishlist`, 'OK', {
      duration: 2000,
    });
  }
  public deleteFromCart(item: ICartItem): void {
    this.cart.updateList(item);
    this._snackBar.open(`${name} was successfully deleted from your cart`, 'OK', {
      duration: 2000,
    });
  }

}
