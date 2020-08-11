import { Injectable } from '@angular/core';
import { Item } from 'src/app/items/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  list:Item[] = [];

  add(item:Item){
    const index = this.list.findIndex((i:Item)=>{
       return i.id === item.id;
     });
     if(index >=0){
       this.list.splice(index,1)
      } else {
        this.list.push(item);
      }
  }

  getItems() {
    return this.list;
  }

  clearCart() {
    this.list = [];
    return this.list;
  }
}
