import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Item } from '../../items/interfaces/item';


@Injectable({
  providedIn: 'root',
})
export class FavoritesService {

  public list: Item[] = [];
  private ilist$ = new BehaviorSubject(this.list);

  constructor() { }

  public getList(): Observable<Item[]> {
    return this.ilist$;
  }

  public update(item: Item): number {
    const index = this.list.findIndex((i: Item) => {
      return i.id === item.id;
    });
    if (index >= 0) {
      this.list.splice(index, 1);
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
