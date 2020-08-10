import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from '../../interfaces/item';
import { ItemsService } from '../../services/items.service';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  
  items:Item[];
  cart = [];
  favorites: Item[]=[];
  constructor(private itemsService:ItemsService, private favoritesService: FavoritesService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

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
    let index = this.favoritesService.add(item);
    this.refreshFavorites();
    if (index >= 0) {
      this._snackBar.open(`${item.name} was deleted from your favorites`, 'OK', {
        duration: 2000,
      });
    } else {
      this._snackBar.open(`${item.name} was added to your favorites`, 'OK', {
        duration: 2000,
      });
    }
  }
  refreshFavorites(){
    if (this.favoritesService.favorites.length > 0) {
      this.favorites = this.favoritesService.favorites
    }
  }
  checkFavorite(item:Item): boolean{ //для отображения иконки избранных товаров
    const index= this.favoritesService.favorites.findIndex((i:Item)=>{
      return i.id === item.id;
    });
    return index >=0
  }
  openDialog(item:Item) {
    this.dialog.open(ModalComponent, { //отправление данных в компонент модалки после открытия
      data:{
        id: item.id,
        img: item.img,
        name: item.name,
        price: item.price
        }
    });
  }
}
