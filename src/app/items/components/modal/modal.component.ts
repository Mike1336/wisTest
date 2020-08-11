import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../../interfaces/item';
import { FavoritesService } from 'src/app/favorites/services/favorites.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Item, private favoritesService: FavoritesService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  addToFavotire(item:Item){
    let index = this.favoritesService.add(item);
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
  checkFavorite(item:Item): boolean{ //для отображения иконки избранных товаров
    const index= this.favoritesService.favorites.findIndex((i:Item)=>{
      return i.id === item.id;
    });
    return index >=0
  }
}
