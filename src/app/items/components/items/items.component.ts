import { Component, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemsService } from '../../services/items.service';
import { FavoritesService } from '../../../favorites/services/favorites.service';



@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  
  items:Item[];
  cart = [];
  favorites: Item[]=[];
  constructor(private itemsService:ItemsService, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.getItems();
    this.refreshFavorites()
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
    console.log(item)
    this.favoritesService.add(item);
    this.refreshFavorites();
    console.log(this.favorites)
  }
  refreshFavorites(){
    this.favoritesService.favorites ? this.favorites = this.favoritesService.favorites : false;
  }
}
