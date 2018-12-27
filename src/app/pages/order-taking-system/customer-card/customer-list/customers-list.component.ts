import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import * as _ from 'lodash';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {CustomerService, ICustomer} from '../customer.service';


@Component({
  selector: 'ngx-customers-list',
  styleUrls: ['./customers-list.component.scss'],
  templateUrl: './customers-list.component.html',
})
export class CustomersListComponent {

  public searchText = '';
  @Input() showBusyIndicator = false;
  @Output() showBusyIndicatorChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() selectedCustomer: ICustomer;
  @Output() selectedCustomerChange: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();
  public customers: ICustomer[] = [];

  constructor(
    public customerService: CustomerService,
    private toasterService: NbToastrService,
  ) {
    this.customerService.selectedCustomer$.subscribe(value => {
      this.selectedCustomer = _.clone(value);
      this.selectedCustomerChange.emit(this.selectedCustomer);
    });
    this.customerService.customers$.subscribe(value => {
      this.customers = _.clone(value);
    });
  }

  updateSelectedCustomer(customer: ICustomer) {
    this.customerService.selectedCustomer$.next(customer);
  }

  deleteCustomer(customer: ICustomer) {
    const isConformed = confirm('Are you sure! Do you want to delete?');
    if (isConformed) {
      this.showBusyIndicator = true;
      this.showBusyIndicatorChange.emit(this.showBusyIndicator);
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
        this.showBusyIndicatorChange.emit(this.showBusyIndicator);
        this.customerService.selectedCustomer$.next(this.customerService.newCustomer);
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
        this.showBusyIndicatorChange.emit(this.showBusyIndicator);
      });
    }
  }
}
