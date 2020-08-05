import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  
  @Input() favorites: [];

  constructor() { }

  ngOnInit(): void {
  }

}
