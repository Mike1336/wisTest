import { Injectable } from '@angular/core';
import { Item } from 'src/app/items/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  list = [];
  totalPrice: number = 0;

  update(item): number{ //adding or deleting item
    const index = this.list.findIndex((i:Item)=>{
       return i.id === item.id;
     });
     if(index >= 0){
       this.list.splice(index,1);
       this.updateTotalPrice();
      } else {
        item['quantity'] = 1;
        this.list.push(item);
        this.updateTotalPrice();
      }
    return index;
  }
  updateTotalPrice(){
    this.totalPrice = 0;
    this.list.forEach( item => {
     this.totalPrice += item.price * item.quantity;
    });
  }
  check(item:Item): boolean{
    const inCart= this.list.some((i:Item)=>{
      return i.id === item.id;
    });
    return inCart; // true if its in cart
  }
}
