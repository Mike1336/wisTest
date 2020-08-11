import { Component, OnInit, ViewChild } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
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
  constructor(private favoritesService: FavoritesService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }
  
  @ViewChild(ModalComponent) confirm: ModalComponent;
  
  ngOnInit(): void {
    this.list = this.favoritesService.favorites;
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
        const index = this.favoritesService.favorites.findIndex((i) => {
      return i.id === id;
    });
    this.favoritesService.favorites.splice(index,1);
    this._snackBar.open(`${name} was deleted from your favorites`, 'OK', {
      duration: 2000,
    });
  }
}
