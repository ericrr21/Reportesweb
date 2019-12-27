import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from '../../../breadcrumb.service';
import {ConfirmationService, Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-boton-panico',
  templateUrl: './boton-panico.component.html',
  styleUrls: ['./boton-panico.component.css'],
  providers: [MessageService,
      ConfirmationService]
})
export class BotonPanicoComponent implements OnInit {
    selectedCausas: string[] = [];
    msgs: Message[] = [];

    constructor(private breadcrumbService: BreadcrumbService, private messageService: MessageService,
                private confirmationService: ConfirmationService) {
        this.breadcrumbService.setItems([
            { label: 'Boton de Pánico', routerLink: ['/panico'] }
        ]);
    }

  ngOnInit() {
  }

    onTabChange(event) {
        // this.messageService.add({severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index});
    }

    confirm1() {
        this.confirmationService.confirm({
            message: '¿Está seguro de proceder con la denuncia formulada?',
            header: 'Confirmación de denuncia',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.msgs = [{severity: 'info', summary: 'Confirmación:', detail: 'Su denuncia ha sido enviada'}];
                this.messageService.add({severity: 'info', summary: 'Confirmado', detail: 'Su denuncia ha sido enviada'});
            },
            reject: () => {
                this.msgs = [{severity: 'info', summary: 'Cancelación:', detail: 'Usted ha cancelado la denuncia'}];
                this.messageService.add({severity: 'info', summary: 'Cancelada', detail: 'Usted ha cancelado la denuncia'});
            }
        });
    }
}
