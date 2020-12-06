import { Component, Inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CartService } from '../../../cart/services/cart.service';
import { ICartItem, IItem } from '../../../items/interfaces/item';

import { Wishlist } from './../../../wishlist/wishlist/wishlist';
import { WishlistService } from './../../../wishlist/services/wishlist.service';
import { Cart } from './../../../cart/classes/cart';

@Component({
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public item: IItem,
    private _wistlistService: WishlistService,
    private _cartService: CartService,
    private _snackBar: MatSnackBar,
  ) {}

  public get cart(): Cart {
    return this._cartService.cart;
  }

  public get wishlist(): Wishlist {
    return this._wistlistService.wishlist;
  }

  public checkInWishlist(item: IItem): void {
    this.wishlist.updateList(item);

    if (this.wishlist.isExist(item)) {
      this._snackBar.open(`${item.name} was successfully added to your wishlist`, 'OK', {
        duration: 2000,
      });

      return;
    }
    this._snackBar.open(`${item.name} was successfully deleted from your wishlist`, 'OK', {
      duration: 2000,
    });
  }
  public checkInCart(item: IItem & ICartItem): void {
    this.cart.updateList(item);

    if (this.cart.isExist(item)) {
      this._snackBar.open(`${item.name} was successfully added to your cart`, 'OK', {
        duration: 2000,
      });

      return;
    }
    this._snackBar.open(`${item.name} was successfully deleted from your cart`, 'OK', {
      duration: 2000,
    });
  }
  public checkWishlistExisting(item: IItem): boolean { // для отображения иконки избранных товаров
    return this.wishlist.isExist(item);
  }
  public checkCartExisting(item: IItem): boolean { // для отображения иконки избранных товаров
    return this.cart.isExist(item);
  }

}
