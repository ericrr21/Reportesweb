import { Component, OnInit } from '@angular/core';

// PrimerUI Components
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-pw pi-file',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'User', icon: 'pi pi-fw pi-user-plus', routerLink: './calculo'},
            {label: 'Filter', icon: 'pi pi-fw pi-filter'}
          ]
        },
          {label: 'Open', icon: 'pi pi-fw pi-external-link', routerLink: './reporte'},
          {separator: true},
          {label: 'Quit', icon: 'pi pi-fw pi-times', routerLink: './calculo'}
        ]
      },
    ];
  }

}
