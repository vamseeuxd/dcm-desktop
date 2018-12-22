import {Component} from '@angular/core';

import {MENU_ITEMS, No_SIDEBAR_MENUS} from './pages-menu';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout [showSideBar]="showSideBar">
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  showSideBar;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSideBar = No_SIDEBAR_MENUS.filter(menuUrl => menuUrl === event.url).length === 0;
      }
    });
  }
  menu = MENU_ITEMS;
}
