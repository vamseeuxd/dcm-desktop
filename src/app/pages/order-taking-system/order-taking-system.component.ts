import {Component, ViewChild} from '@angular/core';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-order-taking-system',
  templateUrl: './order-taking-system.component.html',
})
export class OrderTakingSystemComponent {

  productsList = [];
  allProducts: { id: string, label: string }[] = [];

  constructor(private toastrService: NbToastrService) {
    this.addDummyProducts();
  }

  addDummyProducts() {
    for (let i = 0; i < 10; i++) {
      let newCategory = {categoryName: '', products: []};
      newCategory = {categoryName: 'Category ' + i, products: []};
      for (let j = 0; j < 10; j++) {
        newCategory.products.push({id: i + '-' + j, label: 'Product ' + i + '-' + j});
        this.allProducts.push({id: i + '-' + j, label: 'Product ' + i + '-' + j});
      }
      this.productsList.push(newCategory);
    }
  }

  onQuickProductSelect($event: NgbTypeaheadSelectItemEvent) {
    this.toastrService.show(
      'Product Added To Cart',
      $event.item.label + ' is added to Cart');
  }

  setFocusToQuickSearch(quickProductAccordion, quickProductSearch) {
    if (!quickProductAccordion.collapsed) {
      quickProductSearch.setFocus();
    }
  }
}
