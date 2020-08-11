import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from '../../interfaces/item';
import { ItemsService } from '../../services/items.service';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/cart/services/cart.service';



@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  
  items: Item[] = [];
  cart: Item[] = [];
  favorites: Item[] = [];
  constructor(private itemsService:ItemsService, private favoritesService: FavoritesService, private cartService: CartService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getItems();
    this.refreshFavorites();
  }
  getItems(): void {
    this.itemsService.getItems()
    .subscribe(items => this.items = items);
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

  addToCart(item:Item){
    let index  = this.cartService.add(item);
    if (index >= 0) {
      this._snackBar.open(`${item.name} successfully deleted from your cart`, 'OK', {
        duration: 2000,
      });
    } else {
      this._snackBar.open(`${item.name} successfully added to your cart`, 'OK', {
        duration: 2000,
      });
    }
  }

  refreshFavorites(){
    if (this.favoritesService.list.length > 0) {
      this.favorites = this.favoritesService.list
    }
  }

  refreshCart(){
    if (this.cartService.list.length > 0) {
      this.cart = this.cartService.list
    }
  }

  checkItemForFavorite(item:Item): boolean{ //для отображения иконки избранных товаров
    return this.favoritesService.check(item);
  }

  checkItemForCart(item:Item): boolean{ //для отображения иконки товаров из корзины
    return this.cartService.check(item);
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
