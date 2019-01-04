import {Component, Input, OnInit} from '@angular/core';
import {ProductCategoryService} from '../product-category-service/product-category.service';

@Component({
  selector: 'ngx-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss'],
})
export class ProductManagerComponent implements OnInit {
  @Input() ref: any;

  public categories = [
    {name: 'Category 1', activeFrom: '2018-jan-1', activeTo: '2018-dec-31'},
    {name: 'Category 2', activeFrom: '2018-jan-1', activeTo: '2018-dec-31'},
    {name: 'Category 3', activeFrom: '2018-jan-1', activeTo: '2018-dec-31'},
    {name: 'Category 4', activeFrom: '2018-jan-1', activeTo: '2018-dec-31'},
    {name: 'Category 5', activeFrom: '2018-jan-1', activeTo: '2018-dec-31'},
  ];

  constructor(public productCategoryService: ProductCategoryService) {
  }

  ngOnInit() {
  }

}
