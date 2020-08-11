import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/items/interfaces/item';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  list: Item[] = [];
  constructor(private favoritesService: FavoritesService, public cartService: CartService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }
    
  ngOnInit(): void {
    this.list = this.favoritesService.list;
  }
  openDialog(item:Item) {
    let confirmModal = this.dialog.open(ModalComponent, { //отправление данных в компонент модалки после открытия
      data: {
        id: item.id, 
        name: item.name
      }
    });
    confirmModal.afterClosed().subscribe(result => { //получение данных после закрытия
      if(result){
        this.delFromFavorites(result.id, result.name);
      }
    });
  }
  delFromFavorites(id: number, name: string){
    const index = this.favoritesService.list.findIndex((i) => {
      return i.id === id;
    });
    this.favoritesService.list.splice(index,1);
    this._snackBar.open(`${name} was deleted from your favorites`, 'OK', {
      duration: 2000,
    });
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
  checkItemForCart(item:Item): boolean{ //для отображения иконки товаров из корзины
    return this.cartService.check(item);
  }
}
