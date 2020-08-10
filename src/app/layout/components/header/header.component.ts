import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { Item } from 'src/app/items/interfaces/item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  list:Item[] = [];

  constructor(private favoritesService: FavoritesService) { }

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
