import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-quick-product-search',
  templateUrl: './quick-product-search.component.html',
  styleUrls: ['./quick-product-search.component.scss'],
})
export class QuickProductSearchComponent implements OnInit {

  public model: any;

  @Input() allProducts: { id: string, label: string }[] = [];
  @Output() selectProduct: EventEmitter<NgbTypeaheadSelectItemEvent> = new EventEmitter<NgbTypeaheadSelectItemEvent>();

  // @ts-ignore
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(
        term => term.length < 2 ? [] :
          this.allProducts.filter(v => v.id.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
    );

  formatter = (result: { id: string, label: string }) => result.label.toUpperCase();

  ngOnInit() {
  }

  onProductSelect($event: NgbTypeaheadSelectItemEvent) {
    $event.preventDefault();
    this.model = null;
    this.selectProduct.emit($event);
  }
}
