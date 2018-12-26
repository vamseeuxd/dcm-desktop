import {Component, OnInit} from '@angular/core';
import {CustomerService, ICustomer} from '../customer.service';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-customer-card',
  styleUrls: ['./customer-card.component.scss'],
  templateUrl: './customer-card.component.html',
})
export class CustomerCardComponent {
  public showBusyIndicator = false;
  public selectedCustomer: ICustomer;

  onCustomerSave($event: ICustomer) {
    /*this.searchText = '';
    setTimeout(() => {
      this.searchText = $event.mobile;
    });*/
  }
}
