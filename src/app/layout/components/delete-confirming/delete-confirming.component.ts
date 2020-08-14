import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './delete-confirming.component.html',
  styleUrls: ['./delete-confirming.component.scss'],
})
export class DeleteConfirmingComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      storId: number;
      id: number;
      name: string;
    },
  ) {}

  public ngOnInit(): void {
  }

  public close(): object {
    return {
      storId: this.data.storId,
      id: this.data.id,
      name: this.data.name,
    };
  }

}
