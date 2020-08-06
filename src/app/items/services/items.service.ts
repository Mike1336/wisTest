import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';
import { AngularFirestore} from 'angularfire2/firestore';



@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  public items: Observable<any[]>;

  constructor(public afs: AngularFirestore) { 
    this.items = this.afs.collection('phones').valueChanges();
  }

  getItems(): Observable<Item[]> {
    return this.items;
  }

}
