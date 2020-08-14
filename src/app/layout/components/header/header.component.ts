import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ReplaySubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  private favObs$ : Observable<Item[]>;
  private cartObs$: Observable<any[]>;
  private tpriceObs$: Observable<number>;

  private destroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
  ) { }

  public ngOnInit(): void {
    this.favObs$ = this.favoritesService.getList();
    this.favObs$
      .pipe(takeUntil(this.destroy$))
      .subscribe((favList) => {
        this.favList = favList;
      });
    this.cartObs$ = this.cartService.getList();
    this.cartObs$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cartList) => {
        this.cartList = cartList;
      });
    this.tpriceObs$ = this.cartService.getTotalPrice();
    this.tpriceObs$
      .pipe(takeUntil(this.destroy$))
      .subscribe((totalPrice) => {
        this.totalPrice = totalPrice;
      });
  }
  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
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
