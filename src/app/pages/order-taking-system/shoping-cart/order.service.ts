import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public order$: Subject<IOrder> = new Subject<IOrder>();
  public OrderItems$: Subject<IOrderItem[]> = new Subject<IOrderItem[]>();
  public readonly newOrder: IOrder = {
    id: '',
    customerId: '',
    discount: 0,
    totalItems: 0,
    discountAmount: 0,
    amountPaid: 0,
    amountDue: 0,
    amountTotal: 0,
    amountAfterDiscount: 0,
    lastUpdatedEmployeeId: '',
    lastUpdatedDate: null,
  };
  private _order: IOrder;
  private _OrderItems: IOrderItem[] = [];

  constructor() {
    this.watchOrder();
    this.watchOrderItems();
    this.order$.next(this.newOrder);
    this.OrderItems$.next([]);
  }

  addItem(item: IOrderItem) {
    item.id = _.uniqueId('order=item-');
    this._OrderItems.push(item);
    this.OrderItems$.next(_.clone(this._OrderItems));
    this.updateOrder();
  }

  updateItem(item: IOrderItem) {
    for (let i = 0; i < this._OrderItems.length; i++) {
      if (this._OrderItems[i].id === item.id) {
        this._OrderItems[i] = _.clone(item);
      }
    }
    this.OrderItems$.next(_.clone(this._OrderItems));
    this.updateOrder();
  }

  deleteItem(item: IOrderItem) {
    for (let i = this._OrderItems.length - 1; i >= 0; i--) {
      if (this._OrderItems[i].id === item.id) {
        this._OrderItems.splice(i, 1);
      }
    }
    this.OrderItems$.next(_.clone(this._OrderItems));
    this.updateOrder();
  }

  deleteAllItem() {
    this._OrderItems.splice(0, this._OrderItems.length);
    this.OrderItems$.next(_.clone(this._OrderItems));
    this.updateOrder();
  }

  updateOrder() {
    let amountTotal = 0;
    for (let i = 0; i < this._OrderItems.length; i++) {
      amountTotal += this._OrderItems[i]['productModifiedPrice'];
    }
    this._order.amountTotal = amountTotal;
    if (this._order.discount > 0) {
      this._order.discountAmount = ((this._order.discount / 100) * this._order.amountTotal);
      this._order.amountAfterDiscount = this._order.amountTotal - this._order.discountAmount;
    } else {
      this._order.amountAfterDiscount = this._order.amountTotal;
    }
    this._order.amountDue = this._order.amountAfterDiscount - this._order.amountPaid;
    this._order.totalItems = this._OrderItems.length;
    this.order$.next(_.clone(this._order));
  }

  updatePaidAmount(amountPaid) {
    this._order.amountPaid = _.clone(amountPaid);
    this.updateOrder();
  }

  updateDiscountAmount(discount) {
    this._order.discount = _.clone(discount);
    this.updateOrder();
  }

  private watchOrder() {
    this.order$.subscribe(value => {
      this._order = _.clone(value);
    });
  }

  private watchOrderItems() {
    this.OrderItems$.subscribe(value => {
      this._OrderItems = _.clone(value);
    });
  }

}

export interface IOrderItem {
  id?: string;
  orderId?: string;
  customerId?: string;
  productName: string;
  productActualPrice: number;
  productModifiedPrice: number;
  lastUpdatedEmployeeId?: string;
  lastUpdatedDate?: any;
}


export interface IOrder {
  id?: string;
  totalItems: number;
  discount: number;
  discountAmount: number;
  amountPaid: number;
  amountDue: number;
  amountTotal: number;
  amountAfterDiscount: number;
  customerId?: string;
  lastUpdatedEmployeeId?: string;
  lastUpdatedDate?: any;
}
