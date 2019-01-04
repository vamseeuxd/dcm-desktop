import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable, Subject} from 'rxjs';
import {EmployeeService} from '../../../employee/employee.service';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {

  public readonly newCategory: ICategory = {
    id: '',
    name: '',
    activeFrom: new Date(2018, 0, 1).getTime().toString(),
    activeTo: new Date(2018, 11, 1).getTime().toString(),
  };
  public categories$: Subject<ICategory[]> = new Subject<ICategory[]>();
  public selectedCategory$: Subject<ICategory> = new Subject<ICategory>();
  public selectedCategory: ICategory;
  private itemsRef: AngularFireList<ICategory>;
  private items: Observable<ICategory[]>;
  private _categories: ICategory[] = [];

  constructor(
    private db: AngularFireDatabase,
    private employeeService: EmployeeService,
  ) {
    this.itemsRef = db.list('productCategories');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({id: c.payload.key, ...c.payload.val()})),
      ),
    );
    this.items.subscribe(value => {
      this._categories = _.clone(value);
      this.categories$.next(_.clone(value));
    });

    this.selectedCategory$.subscribe(value => {
      this.selectedCategory = _.clone(value);
    });
  }

  public resetCategory() {
    this.selectedCategory$.next(this.newCategory);
  }

  public addCategory(newCategory: ICategory): Observable<ICategory> {
    return Observable.create(observer => {
      if (!this.isDuplicateCategory(newCategory, true)) {
        delete newCategory.id;
        newCategory.createdEmployeeId = this.employeeService.employeeId;
        newCategory.createdDate = firebase.database.ServerValue.TIMESTAMP;
        newCategory.lastUpdatedEmployeeId = this.employeeService.employeeId;
        newCategory.lastUpdatedDate = firebase.database.ServerValue.TIMESTAMP;
        this.itemsRef.push(newCategory).then(value => {
            newCategory.id = value.key;
            observer.next(_.clone(newCategory));
          },
          reason => observer.error(JSON.stringify(reason)),
        );
      } else {
        observer.error('Duplicate Records Exists');
      }
    });
  }

  public removeCategory(existingCategory: ICategory) {
    return Observable.create(observer => {
      this.itemsRef.remove(existingCategory.id).then(value => {
        observer.next(_.clone(_.clone(existingCategory)));
      }, reason => {
        observer.error(JSON.stringify(reason));
      });
    });
  }

  public updateCategory(existingCategory: ICategory): Observable<ICategory> {
    return Observable.create(observer => {
      if (!this.isDuplicateCategory(existingCategory, false)) {
        const key = _.clone(existingCategory.id);
        delete existingCategory.id;
        existingCategory.lastUpdatedEmployeeId = this.employeeService.employeeId;
        existingCategory.lastUpdatedDate = firebase.database.ServerValue.TIMESTAMP;
        this.itemsRef.update(key, existingCategory).then(value => {
          existingCategory.id = key;
          observer.next(_.clone(_.clone(existingCategory)));
        }, reason => {
          observer.error(JSON.stringify(reason));
        });
      } else {
        observer.error('Duplicate Records Exists');
      }
    });
  }

  private isDuplicateCategory(Category: ICategory, isNew: boolean) {
    if (isNew) {
      const isNameExists = this._categories.filter(value => (value.name.trim().toLowerCase() === Category.name.trim().toLowerCase())).length > 0;
      return isNameExists;
    } else {
      const isNameExists = this._categories.filter(value => (value.id !== Category.id && (value.name.trim().toLowerCase() === Category.name.trim().toLowerCase()))).length > 0;
      return isNameExists;
    }
  }
}


export interface ICategory {
  id: string;
  name: string;
  activeFrom: string;
  activeTo: string;
  createdEmployeeId?: string;
  createdDate?: any;
  lastUpdatedEmployeeId?: string;
  lastUpdatedDate?: any;
}
