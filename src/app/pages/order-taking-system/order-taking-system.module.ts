import {NgModule} from '@angular/core';
import {OrderTakingSystemComponent} from './order-taking-system.component';
import {ChartModule} from 'angular2-chartjs';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {QuickProductSearchComponent} from './quick-product-search/quick-product-search.component';
import {ProductSearchListComponent} from './product-search-list/product-search-list.component';

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
  ],
  exports: [
    OrderTakingSystemComponent,
    QuickProductSearchComponent,
    ProductSearchListComponent,
  ],
  entryComponents: [
    OrderTakingSystemComponent,
    QuickProductSearchComponent,
    ProductSearchListComponent,
  ],
  providers: [],
})
export class OrderTakingSystemModule {
}
