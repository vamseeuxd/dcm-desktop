import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerService, ICustomer} from '../customer.service';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import * as _ from 'lodash';
import set = Reflect.set;

@Component({
  selector: 'ngx-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.scss'],
})
export class AddNewCustomerComponent implements OnInit {
  @Output() onSave: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();
  @Output() onReset: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();
  @Input() showBusyIndicator = false;
  @Output() showBusyIndicatorChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  customer: ICustomer = _.clone(this.customerService.newCustomer);
  defaultCustomer: ICustomer = _.clone(this.customerService.newCustomer);
  refreshForm = true;

  constructor(
    private customerService: CustomerService,
    private toasterService: NbToastrService,
  ) {
    this.customerService.selectedCustomer$.subscribe(value => {
      this.customer = _.clone(value);
      this.defaultCustomer = _.clone(value);
    });
  }

  ngOnInit() {
  }

  resetCustomer() {
    this.customerService.resetCustomer();
  }

  refreshCustomerForm() {
    this.refreshForm = false;
    setTimeout(() => {
      this.refreshForm = true;
    });
  }

  saveCustomer() {
    if (this.customer.id) {
      this.updateCustomer();
    } else {
      this.addCustomer();
    }
  }

  showBusyLoader(canIshow: boolean) {
    this.showBusyIndicator = canIshow;
    this.showBusyIndicatorChange.emit(this.showBusyIndicator);
  }

  updateCustomer() {
    const isConformed = confirm('Are you sure! Do you want to update?');
    if (isConformed) {
      this.showBusyLoader(true);
      this.customerService.updateCustomer(JSON.parse(JSON.stringify(this.customer))).subscribe(success => {
        this.resetCustomer();
        this.toasterService.show(
          'Customer updated successfully',
          `Success`,
          {
            'status': NbToastStatus.SUCCESS,
            'destroyByClick': true,
            'duration': 2000,
            'hasIcon': true,
            'position': NbGlobalPhysicalPosition.TOP_RIGHT,
            'preventDuplicates': false,
          });
        this.customerService.selectedCustomer$.next(_.clone(success));
        this.onSave.emit(success);
        this.refreshCustomerForm();
        this.showBusyLoader(false);
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
        this.showBusyLoader(false);
      });
    }
  }

  addCustomer() {
    this.showBusyLoader(true);
    this.customerService.addCustomer(_.clone(this.customer)).subscribe(success => {
      this.resetCustomer();
      this.toasterService.show(
        'Customer added successfully',
        `Success`,
        {
          'status': NbToastStatus.SUCCESS,
          'destroyByClick': true,
          'duration': 2000,
          'hasIcon': true,
          'position': NbGlobalPhysicalPosition.TOP_RIGHT,
          'preventDuplicates': false,
        });
      this.customerService.selectedCustomer$.next(_.clone(success));
      this.onSave.emit(success);
      this.refreshCustomerForm();
      this.showBusyLoader(false);
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
      this.showBusyLoader(false);
    });
  }

  resetCustomerData() {
    if (this.defaultCustomer.id) {
      setTimeout(() => {
        this.customer = JSON.parse(JSON.stringify(this.defaultCustomer));
        this.onReset.emit(this.customer);
      });
    }
  }

  isUpdateInvalid() {
    return _.isEqual(this.defaultCustomer, this.customer);
  }

  newCustomerForm(customerForm) {
    customerForm.reset();
    this.resetCustomer();
    this.onReset.emit(this.customer);
  }
}
