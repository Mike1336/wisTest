import { Injectable } from '@angular/core';
import { Item } from 'src/app/items/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  list:Item[] = [];

  add(item:Item): number{
    const index = this.list.findIndex((i:Item)=>{
       return i.id === item.id;
     });
     if(index >=0){
       this.list.splice(index,1)
      } else {
        this.list.push(item);
      }
    return index;
  }
  check(item:Item): boolean{
    const inCart= this.list.some((i:Item)=>{
      return i.id === item.id;
    });
    return inCart; // true if its in cart
  }
}
