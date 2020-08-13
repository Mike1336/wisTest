import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription, Subject } from 'rxjs';

import { FavoritesService } from '../../../favorites/services/favorites.service';
import { CartService } from '../../../cart/services/cart.service';
import { Item } from '../../../items/interfaces/item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  public favList: Item[] = [];
  public cartList: any[] = [];
  public totalPrice: number = 0;
  public favObs$: Subscription;
  public cartObs$: Subscription;
  public tpriceObs$: Subscription;

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
  ) { }

  public ngOnInit(): void {
    this.favObs$ = this.favoritesService.getList()
      .subscribe((favList) => {
        this.favList = favList;
      });
    this.cartObs$ = this.cartService.getList()
      .subscribe((cartList) => {
        this.cartList = cartList;
      });
    this.tpriceObs$ = this.cartService.getTotalPrice()
      .subscribe((totalPrice) => {
        this.totalPrice = totalPrice;
      });
  }
  public ngOnDestroy(): void {
    this.favObs$.unsubscribe();
    this.cartObs$.unsubscribe();
    this.tpriceObs$.unsubscribe();
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
