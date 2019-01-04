import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable, Subject} from 'rxjs';
import {EmployeeService} from '../../../employee/employee.service';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  public readonly newProduct: IProduct = {
    id: '',
    name: '',
    category: '',
    isInQuickList: false,
    price: 100,
    activeFrom: new Date(2018, 0, 1).getTime().toString(),
    activeTo: new Date(2018, 11, 1).getTime().toString(),
  };
  public products$: Subject<IProduct[]> = new Subject<IProduct[]>();
  public selectedProduct$: Subject<IProduct> = new Subject<IProduct>();
  public selectedProduct: IProduct;
  private itemsRef: AngularFireList<IProduct>;
  private items: Observable<IProduct[]>;
  private _products: IProduct[] = [];

  constructor(
    private db: AngularFireDatabase,
    private employeeService: EmployeeService,
  ) {
    this.itemsRef = db.list('products');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({id: c.payload.key, ...c.payload.val()})),
      ),
    );
    this.items.subscribe(value => {
      this._products = _.clone(value);
      this.products$.next(_.clone(value));
    });

    this.selectedProduct$.subscribe(value => {
      this.selectedProduct = _.clone(value);
    });
  }

  public resetProduct() {
    this.selectedProduct$.next(this.newProduct);
  }

  public addProduct(newProduct: IProduct): Observable<IProduct> {
    return Observable.create(observer => {
      if (!this.isDuplicateProduct(newProduct, true)) {
        delete newProduct.id;
        newProduct.createdEmployeeId = this.employeeService.employeeId;
        newProduct.createdDate = firebase.database.ServerValue.TIMESTAMP;
        newProduct.lastUpdatedEmployeeId = this.employeeService.employeeId;
        newProduct.lastUpdatedDate = firebase.database.ServerValue.TIMESTAMP;
        this.itemsRef.push(newProduct).then(value => {
            newProduct.id = value.key;
            observer.next(_.clone(newProduct));
          },
          reason => observer.error(JSON.stringify(reason)),
        );
      } else {
        observer.error('Duplicate Records Exists');
      }
    });
  }

  public removeProduct(existingProduct: IProduct) {
    return Observable.create(observer => {
      this.itemsRef.remove(existingProduct.id).then(value => {
        observer.next(_.clone(_.clone(existingProduct)));
      }, reason => {
        observer.error(JSON.stringify(reason));
      });
    });
  }

  public updateProduct(existingProduct: IProduct): Observable<IProduct> {
    return Observable.create(observer => {
      if (!this.isDuplicateProduct(existingProduct, false)) {
        const key = _.clone(existingProduct.id);
        delete existingProduct.id;
        existingProduct.lastUpdatedEmployeeId = this.employeeService.employeeId;
        existingProduct.lastUpdatedDate = firebase.database.ServerValue.TIMESTAMP;
        this.itemsRef.update(key, existingProduct).then(value => {
          existingProduct.id = key;
          observer.next(_.clone(_.clone(existingProduct)));
        }, reason => {
          observer.error(JSON.stringify(reason));
        });
      } else {
        observer.error('Duplicate Records Exists');
      }
    });
  }

  private isDuplicateProduct(Product: IProduct, isNew: boolean) {
    if (isNew) {
      const isNameExists = this._products.filter(value => (value.name.trim().toLowerCase() === Product.name.trim().toLowerCase())).length > 0;
      return isNameExists;
    } else {
      const isNameExists = this._products.filter(value => (value.id !== Product.id && (value.name.trim().toLowerCase() === Product.name.trim().toLowerCase()))).length > 0;
      return isNameExists;
    }
  }
}


export interface IProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  isInQuickList: boolean;
  activeFrom: string;
  activeTo: string;
  createdEmployeeId?: string;
  createdDate?: any;
  lastUpdatedEmployeeId?: string;
  lastUpdatedDate?: any;
}
