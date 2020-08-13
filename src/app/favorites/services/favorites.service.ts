import { Injectable } from '@angular/core';

import { Item } from '../../items/interfaces/item';

// import { Observable } from 'rxjs';
// import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FavoritesService {

  public list: Item[] = [];
  // itemSubject = new Subject<Item[]>();
  // itemObservable = this.itemSubject.asObservable();

  constructor() { }

  public update(item: Item): number {
    const index = this.list.findIndex((i: Item) => {
      return i.id === item.id;
    });
    if (index >= 0) {
      this.list.splice(index, 1)
    } else {
      this.list.push(item);
    }

    return index;
  }
  public check(item: Item): boolean {
    return this.list.some((i: Item) => {
      return i.id === item.id;
    });
  }

}
