import {Component, ViewChild} from '@angular/core';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {NbToastrService} from '@nebular/theme';
import {OrderService} from './shoping-cart/order.service';

@Component({
  selector: 'ngx-order-taking-system',
  templateUrl: './order-taking-system.component.html',
})
export class OrderTakingSystemComponent {

  productList: { categoryName: string, products: { id: string, label: string }[] }[] = [];
  allProducts: { id: string, label: string }[] = [];
  quickProducts: { id: string, label: string }[] = [];

  constructor(
    private toastService: NbToastrService,
    private orderService: OrderService,
  ) {
    this.addDummyProducts();
  }

  addDummyProducts() {
    for (let i = 0; i < 10; i++) {
      let newCategory = {categoryName: '', products: []};
      newCategory = {categoryName: 'Category ' + i, products: []};
      for (let j = 0; j < 10; j++) {
        newCategory.products.push({id: i + '-' + j, label: 'Product ' + i + '-' + j});
        this.allProducts.push({id: i + '-' + j, label: 'Product ' + i + '-' + j});
        if (j === 0) {
          this.quickProducts.push({id: i + '-' + j, label: 'Product ' + i + '-' + j});
        }
      }
      this.productList.push(newCategory);
    }
  }

  onQuickProductSelect($event: { id: string, label: string }) {
    this.orderService.addItem({productName: $event.label, productModifiedPrice: 100, productActualPrice: 100});
    this.toastService.show(
      'Product Added To Cart',
      $event.label + ' is added to Cart',
      {icon: 'fas fa-cart-plus'}
    );
  }
}
