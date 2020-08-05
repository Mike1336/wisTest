import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  
  items:Item[];
  cart = [];
  favorites= [];
  constructor(private itemsService:ItemsService) { }

  ngOnInit(): void {
    this.getItems();
  }
  getItems(): void {
    this.itemsService.getItems()
    .subscribe(items => this.items = items);
  }
  addToCart(item:Item){
    console.log(item);
    for (const i of this.cart) {
      if(item != i){
        this.cart.push(item);
        break;
      }
    }
  }
  addToFavotire(item:Item){
   const index = this.favorites.findIndex((i)=>{
      return i.id === item.id;
    });
    (index >=0) ? this.favorites.splice(index,1):this.favorites.push(item);
  }
}
