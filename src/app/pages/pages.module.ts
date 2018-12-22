import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import {DashboardModule} from './examples/dashboard/dashboard.module';
import {ECommerceModule} from './examples/e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import {MiscellaneousModule} from './examples/miscellaneous/miscellaneous.module';
import {OrderTakingSystemModule} from './order-taking-system/order-taking-system.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    OrderTakingSystemModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
