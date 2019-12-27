import { Component, OnInit } from '@angular/core';

// PrimerUI Components
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Reportes',
        icon: 'pi pi-pw pi-file',
        items: [
          {label: 'Gráfica', icon: 'pi pi-fw pi-chart-bar', routerLink: './reporte'},
          {separator: true},
          {label: 'Dato fuente', icon: 'pi pi-fw pi-table', routerLink: './calculo'}
        ]
      },
    ];
  }

}
