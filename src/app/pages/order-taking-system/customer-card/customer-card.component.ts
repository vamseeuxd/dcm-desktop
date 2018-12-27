import {Component, OnInit} from '@angular/core';
import {ICustomer} from './customer.service';

@Component({
  selector: 'ngx-customer-card',
  styleUrls: ['./customer-card.component.scss'],
  templateUrl: './customer-card.component.html',
})
export class CustomerCardComponent {
  public showBusyIndicator = false;
  public selectedCustomer: ICustomer;

  onCustomerSave($event: ICustomer) {
  }
}
