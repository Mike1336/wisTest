import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';

import { IItem } from '../interfaces/item';


@Injectable({
  providedIn: 'root',
})
export class ItemsService {

  public items$: Observable<IItem[]>;

  constructor(public afs: AngularFirestore) {
    this.items$ = this.afs.collection<IItem>('phones').valueChanges();
  }

  public getItems(): Observable<IItem[]> {
    return this.items$;
  }

}
