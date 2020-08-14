import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Item } from '../../items/interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  public list: any[] = [];
  public totalPrice: number = 0;

  private tprice$ = new BehaviorSubject(this.totalPrice);
  private ilist$ = new BehaviorSubject(this.list);

  public getTotalPrice(): Observable<number> {
    return this.tprice$;
  }
  public getList(): Observable<any[]> {
    return this.ilist$;
  }

  public update(item: any): number { // adding or deleting item
    const index = this.list.findIndex((i: Item) => {
      return i.id === item.id;
    });
    if (index >= 0) {
      delete item.quantity;
      this.ilist$.next(this.list.splice(index, 1));
    } else {
      item.quantity = 1;
      this.list.push(item);
      this.ilist$.next(this.list);
    }
    this.updateTotalPrice();

    return index;
  }

  public updateTotalPrice(): void {
    this.totalPrice = 0;
    this.list.forEach((item) => {
      this.tprice$.next(this.totalPrice += item.price * item.quantity);
    });
  }

  public check(item: Item): boolean {
    return this.list.some((i: Item) => {
      return i.id === item.id;
    });
  }

}
