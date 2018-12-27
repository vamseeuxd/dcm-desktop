import {NgModule} from '@angular/core';
import {OrderTakingSystemComponent} from './order-taking-system.component';
import {ChartModule} from 'angular2-chartjs';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {QuickProductSearchComponent} from './product-search-list/quick-product-search/quick-product-search.component';
import {ProductSearchListComponent} from './product-search-list/product-search-list.component';
import {CustomerCardComponent} from './customer-card/customer-card.component';
import {CustomersListComponent} from './customer-card/customer-list/customers-list.component';
import {AddNewCustomerComponent} from './customer-card/add-new-customer/add-new-customer.component';
import {ShopingCartComponent} from './shoping-cart/shoping-cart.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    LeafletModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    OrderTakingSystemComponent,
    QuickProductSearchComponent,
    ProductSearchListComponent,
    CustomerCardComponent,
    CustomersListComponent,
    AddNewCustomerComponent,
    ShopingCartComponent,
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
