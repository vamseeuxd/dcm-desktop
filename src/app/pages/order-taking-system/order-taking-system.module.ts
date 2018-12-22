import {NgModule} from '@angular/core';
import {OrderTakingSystemComponent} from './order-taking-system.component';
import {ChartModule} from 'angular2-chartjs';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    ChartModule,
    LeafletModule,
  ],
  declarations: [
    OrderTakingSystemComponent,
  ],
  providers: [],
})
export class OrderTakingSystemModule {
}
