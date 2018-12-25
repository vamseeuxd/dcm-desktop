import {NgModule} from '@angular/core';
import {OrderTakingSystemComponent} from './order-taking-system.component';
import {ChartModule} from 'angular2-chartjs';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {QuickProductSearchComponent} from './quick-product-search/quick-product-search.component';
import {ProductSearchListComponent} from './product-search-list/product-search-list.component';
import {CustomerCardComponent} from './customer-card/customer-card.component';
import {ContactsComponent} from './contacts/contacts.component';
import {AddNewCustomerComponent} from './add-new-customer/add-new-customer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    LeafletModule,
    ThemeModule,
  ],
  declarations: [
    OrderTakingSystemComponent,
    QuickProductSearchComponent,
    ProductSearchListComponent,
    CustomerCardComponent,
    ContactsComponent,
    AddNewCustomerComponent,
  ],
  exports: [
    OrderTakingSystemComponent,
    QuickProductSearchComponent,
    ProductSearchListComponent,
    CustomerCardComponent,
    ContactsComponent,
  ],
  entryComponents: [
    OrderTakingSystemComponent,
    QuickProductSearchComponent,
    ProductSearchListComponent,
    CustomerCardComponent,
    ContactsComponent,
  ],
  providers: [],
})
export class OrderTakingSystemModule {
}
