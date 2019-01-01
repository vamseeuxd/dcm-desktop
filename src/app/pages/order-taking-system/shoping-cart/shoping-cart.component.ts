import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import set = Reflect.set;
import {IOrder, IOrderItem, OrderService} from './order.service';

@Component({
  selector: 'ngx-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss'],
})
export class ShopingCartComponent implements OnInit {
  showBusyIndicator = false;

  bill = {
    totalWithOutDiscount: 0,
    totalWithDiscount: 0,
    discountPercentage: 0,
    discountAmount: 0,
    paid: 0,
    due: 0,
  };

  settings = {
    hideSubHeader: true,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      productName: {
        title: 'Product Name',
        type: 'string',
        editable: false,
      },
      price: {
        title: 'Price',
        type: 'number',
      },
    },
    actions: {
      add: false,
      edit: true,
    },
  };

  source: LocalDataSource = new LocalDataSource();


  constructor(private orderService: OrderService) {

    this.orderService.OrderItems$.subscribe((OrderItems: IOrderItem[]) => {
      const mappedData = OrderItems.map((orderItem: IOrderItem) => {
        return {productName: orderItem.productName, price: orderItem.productModifiedPrice, data: orderItem};
      });
      console.log(mappedData);
      this.source.load(mappedData).then(() => {
        this.updateTotals();
      });
    });

    this.orderService.order$.subscribe((value: IOrder) => {
      this.bill.totalWithOutDiscount = value.amountTotal;
      this.bill.totalWithDiscount = value.amountAfterDiscount;
      this.bill.discountPercentage = value.discount;
      this.bill.discountAmount = value.discountAmount;
      this.bill.paid = value.amountPaid;
      this.bill.due = value.amountDue;
    });

    this.orderService.addItem({productName: 'Product 1', productModifiedPrice: 100, productActualPrice: 100});
    this.orderService.addItem({productName: 'Product 2', productModifiedPrice: 200, productActualPrice: 200});
    this.orderService.addItem({productName: 'Product 3', productModifiedPrice: 300, productActualPrice: 300});
    this.orderService.addItem({productName: 'Product 4', productModifiedPrice: 400, productActualPrice: 400});
    this.orderService.addItem({productName: 'Product 5', productModifiedPrice: 500, productActualPrice: 500});
  }

  updateTotalAmount() {
  }

  ngOnInit() {

  }

  updateTotals() {
    setTimeout(() => {
      this.source.getAll().then(value => {
        this.bill.totalWithOutDiscount = value.reduce((a, b) => Number(a) + Number(b.price), 0);
        this.updateTotalAmount();
      });
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.orderService.deleteItem(event.data.data);
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    if (window.confirm('Are you sure you want to Edit Price?')) {
      event.confirm.resolve();
      setTimeout(() => {
        event.newData.data.productModifiedPrice = Number(event.newData.price);
        this.orderService.updateItem(event.newData.data);
      });
    } else {
      event.confirm.reject();
    }
  }

  updateDiscountAmount($event) {
    this.orderService.updateDiscountAmount($event);
  }

  updatePaidAmount($event) {
    this.orderService.updatePaidAmount($event);
  }
}
