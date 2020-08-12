import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { Item } from 'src/app/items/interfaces/item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  favList:Item[] = [];
  cartList = [];
  totalPrice: number = 0;

  constructor(private favoritesService: FavoritesService, private cartService: CartService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.favList = this.favoritesService.list;
    this.cartList = this.cartService.list;
    }
    updateTotalPrice(){
      this.cartService.updateTotalPrice();
   }  
   delFromFavorites(item:Item){
    this.favoritesService.update(item);
    this._snackBar.open(`${item.name} was deleted from your favorites`, 'OK', {
      duration: 2000,
    });
  }
  delFromCart(item:Item){
    this.cartService.update(item);
    this._snackBar.open(`${item.name} successfully deleted from your cart`, 'OK', {
      duration: 2000,
    });
  }
}
