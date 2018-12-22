import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';

// @ts-ignore
@Component({
  selector: 'ngx-product-search-list',
  templateUrl: './product-search-list.component.html',
  styleUrls: ['./product-search-list.component.scss'],
})
export class ProductSearchListComponent {
  @ViewChild('quickProductSearch') quickProductSearch;
  @ViewChild('quickProductAccordion') quickProductAccordion;
  @Output() productSelect: EventEmitter<{ id: string, label: string }> = new EventEmitter<{ id: string, label: string }>();
  @Input() productsList = [];
  @Input() allProducts: { id: string, label: string }[] = [];
  @Input() quickProducts: { id: string, label: string }[] = [];

  onQuickProductSelect($event: { id: string, label: string }) {
    this.productSelect.emit($event);
  }

  setQuickSearchFocus() {
    if (!this.quickProductAccordion.collapsed) {
      this.quickProductSearch.setFocus();
    }
  }

}
