import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CutomerService} from '../cutomer.service';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {ICustomer} from '../customer-card/customer-card.component';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.scss'],
})
export class AddNewCustomerComponent implements OnInit {
  @Output() onSave: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();
  @Output() onReset: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();

  customer: ICustomer = _.clone(this.customerService.newCustomer);
  defaultCustomer: ICustomer = _.clone(this.customerService.newCustomer);
  refreshForm = true;

  constructor(
    private customerService: CutomerService,
    private toastrService: NbToastrService,
  ) {
    this.customerService.selectedCustomer.subscribe(value => {
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

  updateCustomer() {
    this.customerService.updateCustomer(JSON.parse(JSON.stringify(this.customer))).subscribe(success => {
      this.resetCustomer();
      this.toastrService.show(
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
      this.customerService.selectedCustomer.next(_.clone(success));
      this.onSave.emit(success);
      this.refreshCustomerForm();
    }, error => {
      this.toastrService.show(
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
    });
  }

  addCustomer() {
    this.customerService.addCustomer(JSON.parse(JSON.stringify(this.customer))).subscribe(success => {
      this.resetCustomer();
      this.toastrService.show(
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
      this.customerService.selectedCustomer.next(_.clone(success));
      this.onSave.emit(success);
      this.refreshCustomerForm();
    }, error => {
      this.toastrService.show(
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
