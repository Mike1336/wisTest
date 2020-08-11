import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/items/interfaces/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  public list: Item[] = [];

  constructor(public cartService: CartService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
  }

}
