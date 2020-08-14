import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';

import { Item } from '../interfaces/item';


@Injectable({
  providedIn: 'root',
})
export class ItemsService {

  public items$: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {
    this.items$ = this.afs.collection<Item>('phones').valueChanges();
  }

  public getItems(): Observable<Item[]> {
    return this.items$;
  }

}
