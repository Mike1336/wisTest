import { Injectable } from '@angular/core';

import { Item } from '../../items/interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  public list = [];
  public totalPrice: number = 0;

  public update(item: any): number { // adding or deleting item
    const index = this.list.findIndex((i: Item) => {
      return i.id === item.id;
    });
    if(index >= 0){
      delete item.quantity;
      this.list.splice(index, 1);
      this.updateTotalPrice();
    } else {
      item.quantity = 1;
      this.list.push(item);
      this.updateTotalPrice();
    }

    return index;
  }

  public updateTotalPrice(): void {
    this.totalPrice = 0;
    this.list.forEach((item) => {
      this.totalPrice += item.price * item.quantity;
    });
  }

  public check(item: Item): boolean {
    return this.list.some((i: Item) => {
      return i.id === item.id;
    });
  }

}
