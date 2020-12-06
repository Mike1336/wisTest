import { IItem, ICartItem } from '../../items/interfaces/item';

export class Cart {

  private _list: ICartItem[] = [];
  private _totalPrice = 0;

  constructor() {
  }

  public get list(): any[] {
    return this._list;
  }

  public get totalPrice(): number {
    return this._totalPrice;
  }

  public isExist(item: IItem): boolean {
    return this.list.some((i: IItem) => {
      return i.id === item.id;
    });
  }

  public updateList(item: IItem): void { // adding or deleting item
    const itemInList = this.list.find((i: ICartItem) => {
      return i.id === item.id;
    });

    if (!itemInList) {
      this._addItem(item);

      return;
    }

    this._deleteItem(item);
  }

  private _addItem(item: IItem): void {
    this._list.push({ ...item, quantity: 1 });
    this._updateTotalPrice();
  }

  private _deleteItem(item: IItem): void {
    this._list = this._list
    .filter((element) => element.id !== item.id);
    this._updateTotalPrice();
  }

  private _updateTotalPrice(): void {
    this._totalPrice = this._list
        .map((item) => item.price * item.quantity)
            .reduce((prevItem, currItem) => {
              return prevItem + currItem;
            },
            );
  }

}
