import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { DeleteConfirmingComponent } from '../../../layout/components/delete-confirming/delete-confirming.component';

import { ItemDetailsComponent } from './../../../layout/components/item-details/item-details.component';


@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {

  public list = [];
  public totalPrice: number = 0;

  private cartObs$: Observable<any[]>;
  private triceObs$: Observable<number>;

  private destroy$ = new ReplaySubject<any>(1);

  constructor(
    public cartService: CartService,
    public favoritesService: FavoritesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    ) { }

  public ngOnInit(): void {
    this.cartObs$ = this.cartService.getList();
    this.cartObs$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cartList) => {
        this.list = cartList;
      });

    this.triceObs$ = this.cartService.getTotalPrice();
    this.triceObs$
      .pipe(takeUntil(this.destroy$))
      .subscribe((totalPrice) => {
        this.totalPrice = totalPrice;
      });
  }
  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
  public updateTotalPrice(item: any): void {
    this.cartService.updateTotalPrice();
    this.totalPrice = this.cartService.totalPrice;
    if (item.quantity === 0) {
      this.openDialog(item);
    }
  }
  public addToFav(item: any): void {
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
  public checkItemForFav(item: any): boolean { // для отображения иконки товаров из корзины
    return this.favoritesService.check(item);
  }
  public openDialog(item: any): void {
    const confirmModal = this.dialog.open(DeleteConfirmingComponent, { // отправление данных в компонент модалки после открытия
      data: {
        id: item.id,
        name: item.name,
      },
    });
    confirmModal.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => { // получение данных после закрытия
        if (result) {
          this.delFromCart(result.id, result.name);
        } else {
          item.quantity = 1;
          this.updateTotalPrice(item);
        }
      });
  }
  public openItemDetails(item: any): void {
    this.dialog.open(ItemDetailsComponent, { // отправление данных в компонент модалки после открытия
      data: {
        id: item.id,
        img: item.img,
        name: item.name,
        price: item.price,
      },
    });
  }
  public delFromCart(id: number, name: string): void {
    const index = this.cartService.list.findIndex((i) => {
      return i.id === id;
    });
    this.cartService.list.splice(index, 1);
    this._snackBar.open(`${name} successfully deleted from your cart`, 'OK', {
      duration: 2000,
    });
  }

}
