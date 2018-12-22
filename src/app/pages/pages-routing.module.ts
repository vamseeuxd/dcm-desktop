import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import {DashboardComponent} from './examples/dashboard/dashboard.component';
import {ECommerceComponent} from './examples/e-commerce/e-commerce.component';
import {NotFoundComponent} from './examples/miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: ECommerceComponent,
  }, {
    path: 'iot-dashboard',
    component: DashboardComponent,
  }, {
    path: 'ui-features',
    loadChildren: './examples/ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'modal-overlays',
    loadChildren: './examples/modal-overlays/modal-overlays.module#ModalOverlaysModule',
  }, {
    path: 'extra-components',
    loadChildren: './examples/extra-components/extra-components.module#ExtraComponentsModule',
  }, {
    path: 'bootstrap',
    loadChildren: './examples/bootstrap/bootstrap.module#BootstrapModule',
  }, {
    path: 'maps',
    loadChildren: './examples/maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './examples/charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './examples/editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './examples/forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './examples/tables/tables.module#TablesModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './examples/miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
