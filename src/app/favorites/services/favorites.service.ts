import { Injectable } from '@angular/core';
import { Item } from '../../items/interfaces/item';
// import { Observable } from 'rxjs';
// import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites: Item[] = [];
  // itemSubject = new Subject<Item[]>();
  // itemObservable = this.itemSubject.asObservable();

  constructor() { }

  add(item:Item): number{
      const index = this.favorites.findIndex((i:Item)=>{
         return i.id === item.id;
       });
       if(index >=0){
         this.favorites.splice(index,1)
        } else { 
          this.favorites.push(item);
          
        }
        return index;
    }
}
