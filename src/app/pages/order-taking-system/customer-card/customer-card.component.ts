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

  public searchText = '';
  public showBusyIndicator = false;
  public selectedCustomer: ICustomer;
  public customers: ICustomer[] = [];

  constructor(
    public customerService: CustomerService,
    private toasterService: NbToastrService,
  ) {
    this.customerService.selectedCustomer$.subscribe(value => {
      this.selectedCustomer = _.clone(value);
    });
    this.customerService.customers$.subscribe(value => {
      this.customers = _.clone(value);
    });
  }

  onCustomerSave($event: ICustomer) {
    /*this.searchText = '';
    setTimeout(() => {
      this.searchText = $event.mobile;
    });*/
  }

  updateSelectedCustomer(customer: ICustomer) {
    this.customerService.selectedCustomer$.next(customer);
  }

  deleteCustomer(customer: ICustomer) {
    const isConformed = confirm('Are you sure! Do you want to delete?');
    if (isConformed) {
      this.showBusyIndicator = true;
      this.customerService.removeCustomer(customer).subscribe(value => {
        this.toasterService.show(
          'Customer deleted successfully',
          `Success`,
          {
            'status': NbToastStatus.SUCCESS,
            'destroyByClick': true,
            'duration': 2000,
            'hasIcon': true,
            'position': NbGlobalPhysicalPosition.TOP_RIGHT,
            'preventDuplicates': false,
          });
        this.showBusyIndicator = false;
      }, error => {
        this.toasterService.show(
          error,
          `Error`,
          {
            'status': NbToastStatus.DANGER,
            'destroyByClick': true,
            'duration': 2000,
            'hasIcon': true,
            'position': NbGlobalPhysicalPosition.TOP_RIGHT,
            'preventDuplicates': false,
          });
        this.showBusyIndicator = false;
      });
    }
  }
}
