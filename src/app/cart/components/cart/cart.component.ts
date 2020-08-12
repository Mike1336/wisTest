import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  public list = [];
  public totalPrice: number = 0;
  constructor(public cartService: CartService, public favoritesService: FavoritesService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.list = this.cartService.list;
    this.totalPrice = this.cartService.totalPrice;
  }
  updateTotalPrice(item){
    this.cartService.updateTotalPrice();
    this.totalPrice = this.cartService.totalPrice;
    if (item.quantity === 0) {
      this.openDialog(item);
    }
  }
  addToFav(item){
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
  checkItemForFav(item): boolean{ //для отображения иконки товаров из корзины
    return this.favoritesService.check(item);
  }
  openDialog(item) {
    let confirmModal = this.dialog.open(ModalComponent, { //отправление данных в компонент модалки после открытия
      data: {
        id: item.id, 
        name: item.name
      }
    });
    confirmModal.afterClosed().subscribe(result => { //получение данных после закрытия
      if(result){
        this.delFromCart(result.id, result.name);
      } else {
        item.quantity = 1;
        this.updateTotalPrice(item);
      }
    });
  }
  delFromCart(id: number, name: string){
    const index = this.cartService.list.findIndex((i) => {
      return i.id === id;
    });
    this.cartService.list.splice(index,1);
    this._snackBar.open(`${name} successfully deleted from your cart`, 'OK', {
      duration: 2000,
    });
  }
}
