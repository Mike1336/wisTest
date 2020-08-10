import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    id: number,
    name: string
  }) {}

  ngOnInit(): void {
  }
  close(){
    return {
      id: this.data.id,
      name: this.data.name
    }
  }
}

