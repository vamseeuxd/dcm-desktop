import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-customer-card',
  styleUrls: ['./customer-card.component.scss'],
  templateUrl: './customer-card.component.html',
})
export class CustomerCardComponent {

  customers: ICustomer[] = [
    {
      'name': 'Schneider',
      'age': 32,
      'gender': 'male',
      'email': 'undefined.undefined@undefined.co.uk',
      'mobile': '+1 (813) 410-3929',
      'referrer': 'Allison',
      'address': '950 Plaza Street, Grahamtown, South Carolina, 3620',
      'remarks': 'Labore reprehenderit excepteur laboris esse aute fugiat anim commodo duis. ' +
        'Minim laboris sit magna in laboris aliquip. Ex nostrud ipsum enim exercitation deserunt ' +
        'velit veniam. Esse enim cupidatat minim occaecat ullamco consequat reprehenderit aute ea. ' +
        'Velit minim aute sunt sunt amet velit enim anim labore aute ullamco. Dolor occaecat Lorem eu deserunt amet do fugiat laborum.',
    },
    {
      'name': 'Martina',
      'age': 40,
      'gender': 'male',
      'email': 'undefined.undefined@undefined.org',
      'mobile': '+1 (837) 436-2299',
      'referrer': 'Pena',
      'address': '346 Fane Court, Mooresburg, Connecticut, 9859',
      'remarks': 'Et sunt dolor fugiat ullamco eu labore minim ut cupidatat eu est eu deserunt deserunt.' +
        ' Sunt proident tempor ad mollit cupidatat nulla enim duis consequat quis pariatur eiusmod Lorem. ' +
        'Laboris amet voluptate proident non ipsum mollit aliquip do labore id ad.',
    },
    {
      'name': 'Ashlee',
      'age': 37,
      'gender': 'male',
      'email': 'undefined.undefined@undefined.biz',
      'mobile': '+1 (914) 456-3232',
      'referrer': 'Beverly',
      'address': '722 Gaylord Drive, Kipp, Federated States Of Micronesia, 9064',
      'remarks': 'Proident adipisicing ea ipsum reprehenderit fugiat aliqua dolor eiusmod do qui cillum ad est.' +
        ' Pariatur excepteur cillum Lorem enim laboris ut. Laboris sit qui officia amet voluptate pariatur irure' +
        ' nisi veniam. Sint consequat voluptate culpa labore excepteur non labore reprehenderit esse.',
    },
    {
      'name': 'Franklin',
      'age': 20,
      'gender': 'female',
      'email': 'undefined.undefined@undefined.info',
      'mobile': '+1 (908) 561-2762',
      'referrer': 'Rachelle',
      'address': '157 Oxford Walk, Groveville, Alabama, 2147',
      'remarks': 'Excepteur eu cupidatat do elit aliqua esse velit pariatur consequat adipisicing aliquip Lorem. ' +
        'Est sint proident proident ullamco adipisicing ut tempor adipisicing fugiat adipisicing nostrud ipsum minim' +
        ' non. Voluptate consequat consectetur velit sit. Magna Lorem mollit reprehenderit nisi pariatur nisi velit' +
        ' excepteur reprehenderit ea ullamco ullamco.',
    },
    {
      'name': 'Latonya',
      'age': 37,
      'gender': 'female',
      'email': 'undefined.undefined@undefined.me',
      'mobile': '+1 (961) 469-2558',
      'referrer': 'Kerri',
      'address': '392 Lake Place, Freelandville, District Of Columbia, 231',
      'remarks': 'Ea amet proident sunt magna aute dolor culpa consequat deserunt sunt consequat cillum ad in. ' +
        'Aute enim anim mollit adipisicing commodo adipisicing dolor non velit. Mollit qui fugiat consequat Lorem ' +
        'nulla dolor cupidatat et sint ullamco eiusmod eu veniam irure.',
    },
    {
      'name': 'Hatfield',
      'age': 25,
      'gender': 'male',
      'email': 'undefined.undefined@undefined.com',
      'mobile': '+1 (846) 462-2917',
      'referrer': 'Shaw',
      'address': '480 Bayview Avenue, Tyhee, Tennessee, 6664',
      'remarks': 'Nisi fugiat eu exercitation elit proident sint enim minim elit minim. Sunt adipisicing non occaecat ' +
        'voluptate cupidatat ad nulla irure eiusmod et cillum. Dolore do non ipsum irure aute. Ullamco ullamco ullamco ' +
        'incididunt dolor. Culpa non ea ipsum esse excepteur tempor ad minim.',
    },
    {
      'name': 'Jeannine',
      'age': 27,
      'gender': 'male',
      'email': 'undefined.undefined@undefined.name',
      'mobile': '+1 (887) 437-3428',
      'referrer': 'Carmella',
      'address': '238 Reeve Place, Eastvale, New York, 3138',
      'remarks': 'Labore laborum excepteur tempor fugiat. Do voluptate irure excepteur eu ad sint est et pariatur est do duis.' +
        ' Non et culpa laborum et cillum. Nostrud consectetur est laborum mollit non commodo. Sit esse reprehenderit commodo ' +
        'incididunt ullamco reprehenderit veniam adipisicing aliqua labore dolor in consequat.',
    },
    {
      'name': 'Oneal',
      'age': 23,
      'gender': 'female',
      'email': 'undefined.undefined@undefined.biz',
      'mobile': '+1 (882) 516-2918',
      'referrer': 'Estelle',
      'address': '927 Herkimer Street, Moscow, California, 5927',
      'remarks': 'Est pariatur magna velit voluptate minim proident. Sint nostrud sunt mollit eiusmod officia proident eiusmod non.' +
        ' Reprehenderit veniam dolore ipsum commodo anim commodo. Veniam ipsum incididunt eiusmod occaecat eu laboris sit ea. Elit et ' +
        'laboris non elit ex exercitation Lorem non duis in excepteur ut veniam. Reprehenderit culpa mollit ullamco fugiat nulla' +
        ' ullamco magna consequat ullamco ipsum do aute sint. Sint pariatur nulla reprehenderit enim.',
    },
    {
      'name': 'Weiss',
      'age': 20,
      'gender': 'female',
      'email': 'undefined.undefined@undefined.tv',
      'mobile': '+1 (854) 422-2070',
      'referrer': 'Gardner',
      'address': '226 Rockwell Place, Bradenville, Texas, 7829',
      'remarks': 'Commodo duis velit qui consectetur labore culpa fugiat consectetur. Consectetur nisi in enim sit irure magna ' +
        'non duis do do culpa laboris. Fugiat et eiusmod labore elit minim in duis eu laboris sit reprehenderit est enim. Anim' +
        ' proident mollit exercitation eu nostrud eiusmod laboris sit exercitation quis ut do.',
    },
    {
      'name': 'Carolyn',
      'age': 40,
      'gender': 'female',
      'email': 'undefined.undefined@undefined.net',
      'mobile': '+1 (863) 581-3395',
      'referrer': 'Ebony',
      'address': '354 Evergreen Avenue, Harold, Oklahoma, 5014',
      'remarks': 'Magna nostrud adipisicing officia mollit nisi voluptate. Dolore anim laborum deserunt id cupidatat nostrud. ' +
        'Exercitation aliquip officia anim amet in. Eu est consectetur dolore laboris qui sint laboris mollit reprehenderit duis et dolor.',
    },
  ];

  customer = {
    name: null,
    age: 0,
    gender: '',
    email: '',
    mobile: null,
    referrer: '',
    address: '',
    remarks: '',
  };

  flipped = false;

  isOldCustomer = false;

  nameInputFormatter = (result: ICustomer) => result.name;
  nameResultFormatter = (result: ICustomer) => (result.name + ' ( Mobile:' + result.mobile + ') ');
  mobileInputFormatter = (result: ICustomer) => result.mobile;
  mobileResultFormatter = (result: ICustomer) => (result.mobile + ' ( Name:' + result.name + ') ');

  nameSearch = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(
        term => term.length < 2 ? [] :
          this.customers.filter(product => product.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)),
    );
  }

  mobileSearch = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(
        term => term.length < 2 ? [] :
          this.customers.filter(product => product.mobile.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)),
    );
  }

  toggleView() {
    this.flipped = !this.flipped;
  }

  cloneCustomer() {
    return {
      name: '',
      age: 0,
      gender: '',
      email: '',
      mobile: '',
      referrer: '',
      address: '',
      remarks: '',
    };
  }

  resetCustomer() {
    this.customer = {
      name: '',
      age: 0,
      gender: '',
      email: '',
      mobile: '',
      referrer: '',
      address: '',
      remarks: '',
    };
  }

  saveCustomer() {
    // console.log(this.customer);
    this.resetCustomer();
    this.isOldCustomer = false;
  }

  updateCustomer($event: NgbTypeaheadSelectItemEvent, filedName) {
    this.customer = JSON.parse(JSON.stringify($event.item));
    setTimeout(() => {
      this.customer.name = this.customer[filedName];
      this.customer.mobile = this.customer[filedName];
      this.isOldCustomer = true;
    }, 5);

  }

  resetCustomerData() {
    this.resetCustomer();
    this.isOldCustomer = false;
  }
}

export interface ICustomer {
  name: any;
  age: number;
  gender: string;
  email: string;
  mobile: any;
  referrer: string;
  address: string;
  remarks: string;
}
