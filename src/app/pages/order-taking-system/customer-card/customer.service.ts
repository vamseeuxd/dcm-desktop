import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import * as _ from 'lodash';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import {EmployeeService} from '../../employee/employee.service';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private itemsRef: AngularFireList<ICustomer>;
  private items: Observable<ICustomer[]>;

  public readonly newCustomer: ICustomer = {
    id: '',
    lastUpdatedEmployeeId: '',
    lastUpdatedDate: '',
    name: '',
    dateOfBirth: null,
    gender: '',
    email: '',
    mobile: '',
    referrer: '',
    address: '',
    remarks: '',
  };

  public customers$: Subject<ICustomer[]> = new Subject<ICustomer[]>();
  public selectedCustomer$: Subject<ICustomer> = new Subject<ICustomer>();
  public selectedCustomer: ICustomer;
  private _customers: ICustomer[] = [];

  constructor(
    private db: AngularFireDatabase,
    private employeeService: EmployeeService,
  ) {
    this.itemsRef = db.list('customers');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({id: c.payload.key, ...c.payload.val()})),
      ),
    );
    this.items.subscribe(value => {
      this._customers = _.clone(value);
      this.customers$.next(_.clone(value));
    });

    this.selectedCustomer$.subscribe(value => {
      this.selectedCustomer = _.clone(value);
    });
  }

  public resetCustomer() {
    this.selectedCustomer$.next(this.newCustomer);
  }

  public addCustomer(newCustomer: ICustomer): Observable<ICustomer> {
    return Observable.create(observer => {
      if (!this.isDuplicateCustomer(newCustomer, true)) {
        delete newCustomer.id;
        newCustomer.lastUpdatedEmployeeId = this.employeeService.employeeId;
        newCustomer.lastUpdatedDate = firebase.database.ServerValue.TIMESTAMP; // new Date().getTime().toString();
        this.itemsRef.push(newCustomer).then(value => {
            newCustomer.id = value.key;
            observer.next(_.clone(newCustomer));
          },
          reason => observer.error(JSON.stringify(reason)),
        );
      } else {
        observer.error('Duplicate Records Exists');
      }
    });
  }

  public removeCustomer(existingCustomer: ICustomer) {
    return Observable.create(observer => {
      this.itemsRef.remove(existingCustomer.id).then(value => {
        observer.next(_.clone(_.clone(existingCustomer)));
      }, reason => {
        observer.error(JSON.stringify(reason));
      });
    });
  }

  public updateCustomer(existingCustomer: ICustomer): Observable<ICustomer> {
    return Observable.create(observer => {
      if (!this.isDuplicateCustomer(existingCustomer, false)) {
        const key = _.clone(existingCustomer.id);
        delete existingCustomer.id;
        existingCustomer.lastUpdatedEmployeeId = this.employeeService.employeeId;
        existingCustomer.lastUpdatedDate = firebase.database.ServerValue.TIMESTAMP; // new Date().getTime().toString();
        this.itemsRef.update(key, existingCustomer).then(value => {
          existingCustomer.id = key;
          observer.next(_.clone(_.clone(existingCustomer)));
        }, reason => {
          observer.error(JSON.stringify(reason));
        });
      } else {
        observer.error('Duplicate Records Exists');
      }
    });
  }

  private isDuplicateCustomer(customer: ICustomer, isNew: boolean) {
    if (isNew) {
      const isMobileExists = this._customers.filter(value =>
        (
          value.mobile.trim().toLowerCase() === customer.mobile.trim().toLowerCase() &&
          value.name.trim().toLowerCase() === customer.name.trim().toLowerCase()
        ),
      ).length > 0;
      return isMobileExists;
    } else {
      const isMobileExists = this._customers.filter(value =>
        (
          value.id !== customer.id &&
          (
            value.mobile.trim().toLowerCase() === customer.mobile.trim().toLowerCase() &&
            value.name.trim().toLowerCase() === customer.name.trim().toLowerCase()
          )
        ),
      ).length > 0;
      return isMobileExists;
    }
  }
}

export interface ICustomer {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  mobile: string;
  referrer: string;
  address: string;
  remarks: string;
  lastUpdatedEmployeeId: string;
  lastUpdatedDate: any;
}
