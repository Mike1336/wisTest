import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import {MatDialog} from '@angular/material/dialog';
import { Item } from 'src/app/items/interfaces/item';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  list: Item[] = [];
  
  constructor(private favoritesService: FavoritesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list = this.favoritesService.favorites;
  }
  delFromFavorites(item:Item){
        const index = this.favoritesService.favorites.findIndex((i) => {
      return i.id === item.id;
    });
    this.favoritesService.favorites.splice(index,1);
  }

}
