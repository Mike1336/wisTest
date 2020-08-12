import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../../interfaces/item';
import { FavoritesService } from 'src/app/favorites/services/favorites.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/cart/services/cart.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Item, private favoritesService: FavoritesService, private cartService: CartService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  addToFavotire(item:Item){
    let index = this.favoritesService.update(item);
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
    let index = this.cartService.update(item);
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
  checkFavorite(item:Item): boolean{ //для отображения иконки избранных товаров
    const index= this.favoritesService.list.findIndex((i:Item)=>{
      return i.id === item.id;
    });
    return index >=0
  }
  checkCart(item:Item): boolean{ //для отображения иконки избранных товаров
    const index= this.cartService.list.findIndex((i:Item)=>{
      return i.id === item.id;
    });
    return index >=0
  }
}
