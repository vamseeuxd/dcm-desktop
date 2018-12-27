import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'ngx-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss'],
})
export class ShopingCartComponent implements OnInit {

  totalBillAmount = 0;
  discountAmount = 0;
  amountPaid = 0;

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

  constructor() {
    this.source.load([
      {productName: 'Product 1', price: 100},
      {productName: 'Product 2', price: 200},
      {productName: 'Product 3', price: 300},
      {productName: 'Product 4', price: 400},
      {productName: 'Product 5', price: 500},
    ]);
    this.updateTotals();
  }

  ngOnInit() {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.updateTotals();
    } else {
      event.confirm.reject();
    }
  }

  updateTotals() {
    setTimeout(() => {
      this.source.getAll().then(value => {
        this.totalBillAmount = value.reduce((a, b) => a + b.price, 0);
      }, reason => {
      });
    });
  }

}
