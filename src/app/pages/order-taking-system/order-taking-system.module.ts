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
import {CustomersListComponent} from './contacts/customers-list.component';
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
    CustomersListComponent,
    AddNewCustomerComponent,
  ],
  exports: [
    OrderTakingSystemComponent,
    QuickProductSearchComponent,
    ProductSearchListComponent,
    CustomerCardComponent,
    CustomersListComponent,
  ],
  entryComponents: [
    OrderTakingSystemComponent,
    QuickProductSearchComponent,
    ProductSearchListComponent,
    CustomerCardComponent,
    CustomersListComponent,
  ],
  providers: [],
})
export class OrderTakingSystemModule {
}
