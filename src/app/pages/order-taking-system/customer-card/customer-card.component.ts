import {Component, OnInit} from '@angular/core';
import {CutomerService} from '../cutomer.service';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-customer-card',
  styleUrls: ['./customer-card.component.scss'],
  templateUrl: './customer-card.component.html',
})
export class CustomerCardComponent {

  searchText = '';
  private selectedCustomer: ICustomer;

  constructor(
    private customerService: CutomerService,
  ) {
    this.customerService.selectedCustomer.subscribe(value => {
      this.selectedCustomer = _.clone(value);
    });
  }

  onCustomerSave($event: ICustomer) {
    this.searchText = '';
    setTimeout(() => {
      this.searchText = $event.mobile;
    });
  }

  updateSelectedCustomer(customer: ICustomer) {
    this.customerService.selectedCustomer.next(customer);
  }
}

export interface ICustomer {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  mobile: string;
  referrer: string;
  address: string;
  remarks: string;
}
