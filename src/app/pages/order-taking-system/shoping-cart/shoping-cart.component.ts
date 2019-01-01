import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import set = Reflect.set;

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


  constructor() {
    this.source.load([
      {productName: 'Product 1', price: 100},
      {productName: 'Product 2', price: 100},
      {productName: 'Product 3', price: 100},
      {productName: 'Product 4', price: 100},
      {productName: 'Product 5', price: 100},
    ]).then(() => {
      this.updateTotals();
    });
  }

  updateTotalAmount() {
    if (this.bill.discountPercentage > 0) {
      this.bill.discountAmount = ((this.bill.discountPercentage / 100) * this.bill.totalWithOutDiscount);
      this.bill.totalWithDiscount = this.bill.totalWithOutDiscount - this.bill.discountAmount;
    } else {
      this.bill.totalWithDiscount = this.bill.totalWithOutDiscount;
    }
    this.bill.due = this.bill.totalWithDiscount - this.bill.paid;
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
      this.updateTotals();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    if (window.confirm('Are you sure you want to Edit Price?')) {
      event.confirm.resolve();
      this.updateTotals();
    } else {
      event.confirm.reject();
    }
  }
}
