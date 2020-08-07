import { Injectable } from '@angular/core';
import { Item } from '../../items/interfaces/item';
// import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites: Item[] = [];
  // itemSubject = new Subject<Item[]>();
  // itemObservable = this.itemSubject.asObservable();

  constructor() { }

  add(item:Item){
      const index = this.favorites.findIndex((i:Item)=>{
         return i.id === item.id;
       });
       (index >=0) ? this.favorites.splice(index,1) : this.favorites.push(item);
      console.log(this.favorites)
    }
}
