import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  @ViewChild('searchInput') searchInput: any;
  @Input() allProducts: { id: string, label: string }[] = [];
  @Output() selectProduct: EventEmitter<NgbTypeaheadSelectItemEvent> = new EventEmitter<NgbTypeaheadSelectItemEvent>();

  // @ts-ignore
  // @ts-ignore
  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(
        term => term.length < 2 ? [] :
          this.allProducts
            .filter(product => product.id.toLowerCase()
              .indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
    );
  }

  formatter = (result: { id: string, label: string }) => result.label.toUpperCase();

  ngOnInit() {
  }

  onProductSelect($event: NgbTypeaheadSelectItemEvent) {
    $event.preventDefault();
    this.model = null;
    this.selectProduct.emit($event);
  }

  setFocus() {
    setTimeout(() => this.searchInput.nativeElement.focus(), 50);
  }
}
