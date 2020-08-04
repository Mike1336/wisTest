import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items: Item[] = [
      { id: 1, name: 'iPhone 6S', price: 6999, img:'assets/6s.png' },
      { id: 2, name: 'iPhone XS', price: 69999, img:'assets/xs.jpg' },
      { id: 3, name: 'iPhone XS Max', price: 699999, img:'assets/xsmax.jpeg' },
    ];
    return {items};
  }
}
