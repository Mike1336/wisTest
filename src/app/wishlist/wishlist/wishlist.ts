import { IItem } from '../../items/interfaces/item';

export class Wishlist {

  private _list: IItem[] = [];

  constructor() {
  }

  public get list(): any[] {
    return this._list;
  }

  public isExist(item: IItem): boolean {
    return this.list.some((i: IItem) => {
      return i.id === item.id;
    });
  }

  public updateList(item: IItem): void {
    // adding or deleting item
    const itemInList = this.list.find((i: IItem) => {
      return i.id === item.id;
    });

    if (!itemInList) {
      this._addItem(item);

      return;
    }

    this._deleteItem(item);
  }

  private _addItem(item: IItem): void {
    this._list.push(item);
  }

  private _deleteItem(item: IItem): void {
    this._list = this._list
    .filter((element) => element.id !== item.id);
  }

}
