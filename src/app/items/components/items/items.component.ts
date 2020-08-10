import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(private itemsService:ItemsService, private favoritesService: FavoritesService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getItems();
    this.refreshFavorites();
  }
  getItems(): void {
    this.itemsService.getItems()
    .subscribe(items => this.items = items);
  }
  addToCart(item:Item){
    
  }
  addToFavotire(item:Item){
    console.log(item)
    this.favoritesService.add(item);
    this.refreshFavorites();
    this._snackBar.open(`${item.name} was added to your favorites`, 'OK', {
      duration: 2000,
    });
  }
  refreshFavorites(){
    this.favoritesService.favorites.length > 0 ? this.favorites = this.favoritesService.favorites : false;
  }
  checkFavorite(item:Item): boolean{
    const index= this.favoritesService.favorites.findIndex((i:Item)=>{
      return i.id === item.id;
    });
    return index >=0
  }
}
