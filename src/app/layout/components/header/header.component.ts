import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ReplaySubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FavoritesService } from '../../../favorites/services/favorites.service';
import { CartService } from '../../../cart/services/cart.service';
import { Item } from '../../../items/interfaces/item';

import { DeleteConfirmingComponent } from './../delete-confirming/delete-confirming.component';
import { ItemDetailsComponent } from './../item-details/item-details.component';

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
    public dialog: MatDialog,
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

  public openDialog(storageId: number, item: any): void {
    const confirmModal = this.dialog.open(DeleteConfirmingComponent, { // отправление данных в компонент модалки после открытия
      data: {
        id: item.id,
        name: item.name,
        storId: storageId,
      },
    });
    confirmModal.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => { // получение данных после закрытия
        if (result) {
          this.delFromStorage(result.storId, result.id, result.name);
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

  public updateTotalPrice(item: any): void {
    if (item.quantity === 0) {
      this.openDialog(2, item);
    }
    this.cartService.updateTotalPrice();
  }

  public delFromStorage(storageId: number, id: number, name: string): void {
    switch (storageId) {
      case 1:
        const index1 = this.favoritesService.list.findIndex((i) => {
          return i.id === id;
        });
        this.favoritesService.list.splice(index1, 1);
        this._snackBar.open(`${name} was deleted from your favorites`, 'OK', {
          duration: 2000,
        });
        break;
      case 2:
        const index2 = this.cartService.list.findIndex((i) => {
          return i.id === id;
        });
        this.cartService.list.splice(index2, 1);
        this._snackBar.open(`${name} successfully deleted from your cart`, 'OK', {
          duration: 2000,
        });
        break;
    }
  }

}
