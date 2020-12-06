import { Component, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CartService } from '../../../cart/services/cart.service';
import { ICartItem, IItem } from '../../../items/interfaces/item';
import { Wishlist } from '../../wishlist/wishlist';
import { WishlistService } from '../../services/wishlist.service';
import { Cart } from '../../../cart/classes/cart';
import { DeleteConfirmingComponent } from '../../../layout/components/delete-confirming/delete-confirming.component';
import { ItemDetailsComponent } from '../../../layout/components/item-details/item-details.component';

@Component({
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private _wishlistService: WishlistService,
    public _cartService: CartService,
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

  public openDeleteConfirming(item: IItem): void {
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
  public deleteItem(item: IItem): void {
    this.wishlist.updateList(item);
    this._snackBar.open(`${name} was deleted from your favorites`, 'OK', {
      duration: 2000,
    });
  }

  public checkInCart(item: IItem & ICartItem): void {
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

  public checkItemForCart(item: IItem & ICartItem): boolean {
    // для отображения иконки товаров из корзины
    return this.cart.isExist(item);
  }

}
