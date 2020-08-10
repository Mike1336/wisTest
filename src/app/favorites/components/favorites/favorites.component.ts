import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/items/interfaces/item';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  list: Item[] = [];
  
  constructor(private favoritesService: FavoritesService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.list = this.favoritesService.favorites;
  }
  delFromFavorites(item:Item){
        const index = this.favoritesService.favorites.findIndex((i) => {
      return i.id === item.id;
    });
    this.favoritesService.favorites.splice(index,1);
    this._snackBar.open(`${item.name} was deleted from your favorites`, 'OK', {
      duration: 2000,
    });
  }

}
