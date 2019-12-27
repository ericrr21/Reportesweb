import { Component, OnInit } from '@angular/core';


// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import {ConfirmationService, Message} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {FuenteModel} from '../../../clases/models/datofuente/fuente-model';
import {OpeningComponentDTO} from '../../../clases/openingcomponents/opening-component-dto';
import {OpeningElement} from '../../../clases/models/datofuente/opening-element';
import {OpeningComponentCell} from '../../../clases/openingcomponents/opening-component-cell';
import {OpeningComponent} from '../../../clases/openingcomponents/opening-component';
import {OpeningComponentService} from '../../service/opening-component.service';
import {OpeningElementList} from '../../../clases/models/datofuente/opening-element-list';
import {BreadcrumbService} from '../../../breadcrumb.service';

@Component({
  selector: 'app-calculo',
  templateUrl: './calculo.component.html',
  styleUrls: ['./calculo.component.css'],
  providers: [MessageService,
        ConfirmationService]
})
export class CalculoComponent implements OnInit {

    @BlockUI() blockUI: NgBlockUI;

    checked: boolean = true;

    loading: boolean = false;
    error: any;
    openingComponentDTO: OpeningComponentDTO;

    fuentes: FuenteModel[];
    rangosTiempoSellout: FuenteModel[];
    rangosTiempoStock: FuenteModel[];
    rangosTiempo: FuenteModel[];
    rangoTiempoSelected: FuenteModel;
    fuenteSeleccionada: FuenteModel;
    opciones: FuenteModel[];
    opcionesSeleccionadas: FuenteModel[];

    rangeDates: Date[];
    sumarPeriodos: boolean = false;
    maxDate: Date = new Date();
    es: any;
    rowGroupMetadata: any;


    openingElementsSource: OpeningElement[];
    openingElementsTarget: OpeningElement[]  = [];
    openingElementsTargetSelected: OpeningElement = null;
    selectedFinalValues: OpeningComponentCell[];
    openingComponentCellListSelected: OpeningComponentCell[];
    openingComponentSelected: OpeningComponent = null;
    cols: any[];
    msgs: Message[] = [];


    Selected = [false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ];

    blockedPanel: boolean = false;


    constructor(private breadcrumbService: BreadcrumbService, private openingComponentService: OpeningComponentService,
                private messageService: MessageService) {
        this.breadcrumbService.setItems([
            { label: 'Dato Fuente', routerLink: ['/datofuente'] }
        ]);
    }

    ngOnInit() {
        this.msgs = [];
        this.es = {
            firstDayOfWeek: 1,
            dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
            dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
            dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
            monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
            monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
            today: 'Hoy',
            clear: 'Borrar'
        };

        this.openingComponentCellListSelected = [];

        this.getOpeningComponentDTO();
        this.fuentes = [
            {id: 'SELL', nombre: 'Venta Sellout', visible: true},
            {id: 'STOCK', nombre: 'Inventario', visible: true}
        ];
        this.rangosTiempoSellout = [
            {id: 'dia', nombre: 'Por días', visible: true},
            {id: 'semana', nombre: 'Por semanas', visible: true},
            {id: 'mes', nombre: 'Por meses', visible: true},
            {id: 'ano', nombre: 'Por años', visible: true}
        ];
        this.rangosTiempoStock = [
            {id: 'dia', nombre: 'Por días', visible: true},
        ];
        this.opciones = [
            {id: 'MONTO', nombre: 'Monto', visible: true},
            {id: 'UNIDAD', nombre: 'Unidad', visible: true}
        ];
        this.cols = [
           // { field: 'value', header: 'Nombre' },
            { field: 'name', header: 'Aperturas'},
        ];
    }
    getOpeningComponentDTO() {
        this.blockUI.start('Cargando...'); // Start blocking
        this.openingComponentService.getOpeningComponent()
            .subscribe( resp => {
                    this.openingComponentDTO = resp;
                    this.llenadoVariables();
                    console.log('Todo bien: ');
                    this.blockUI.stop(); // Stop
                },
                error => {
                    this.error = error;
                    this.blockUI.stop(); // Stop
                    console.log('Ocurrió el siguiente error: ', error);
                }
            );
    }

    llenadoVariables() {
        this.openingElementsSource = [];
        this.openingComponentCellListSelected = [];
        /*Adiciono los locales*/
        for(let i = 0; i < Object.keys(this.openingComponentDTO.openingComponentPremises).length ; i++){
            let idG = Object.keys(this.openingComponentDTO.openingComponentPremises)[i];
            let openingElement: OpeningElement = {
                openingComponentCellList: [],
                type: 'LOCALES',
                id: idG,
                all: false,
                name: this.openingComponentDTO.openingComponentPremises[idG].name,
            };
            this.openingElementsSource.push(openingElement);
        }
        /*Adiciono los productos*/
        for(let i = 0; i < Object.keys(this.openingComponentDTO.openingComponentProducts).length ; i++){
            let idG = Object.keys(this.openingComponentDTO.openingComponentProducts)[i];
            let openingElement: OpeningElement = {
                openingComponentCellList: [],
                type: 'PRODUCTOS',
                id: idG,
                all: false,
                name: this.openingComponentDTO.openingComponentProducts[idG].name,
            };
            this.openingElementsSource.push(openingElement);
        }
    }

    l(event) {
        console.log(event);
    }
    onTargetSelect(event: any) {
        // this.openingElementsTarget = [];
        console.log(event);
        // this.openingElementsTargetSelected = event.items[0];
       this.openingElementsTargetSelected = event;
        console.log( this.openingElementsTargetSelected);
        this.openingComponentSelected = null;
        let index = this.openingElementsTarget.indexOf(event);
        console.log('index -> ' + index);
        console.log(this.openingElementsTarget);
        if (index === -1) {
            this.openingElementsTarget.push(event);
        }


                let idSelected: string = this.openingElementsTargetSelected.id;
                let typeSelected: string = this.openingElementsTargetSelected.type;
                let tablaBuscar = null;
                let componentSelected: OpeningComponent;

                        if(typeSelected === 'LOCALES'){
                            tablaBuscar = this.openingComponentDTO.openingComponentPremises;
                        }else if(typeSelected === 'PRODUCTOS'){
                            tablaBuscar = this.openingComponentDTO.openingComponentProducts;
                        }

                        for(let i = 0; i< Object.keys(tablaBuscar).length; ++i){
                            if(Object.keys(tablaBuscar)[i] === idSelected){
                                componentSelected = tablaBuscar[idSelected];
                            }
                        }

          this.openingComponentSelected = componentSelected;
          this.selectedFinalValues = this.openingElementsTargetSelected.openingComponentCellList;
          // All default si no existe en el arreglo
        if (index === -1  || this.selectedFinalValues.length === 0) {
            this.openingComponentSelected.openingComponentCellList.forEach(value => {
                this.selectedFinalValues.push(value);
            });
        }

        this.SelectedIndicador(event.id, true);



    }

    donRowUnSelectMain(event) {
        /**
         * con doble clic se deseleccionan las aperturas por lo que tenemos que deseleccionar
         * sus valores
         */

        let index = this.openingElementsTarget.indexOf(event);
        console.log('index -> ' + index);
        console.log(this.openingElementsTarget);
        if (index !== -1) {
            this.selectedFinalValues = [];
            this.openingElementsTargetSelected.openingComponentCellList = [];
            //this.openingComponentSelected.openingComponentCellList = [];
            this.openingElementsTarget.splice(index, 1);// remove element from array
        }

        this.SelectedIndicador(event.id, false);
    }
    onRowSelect(event: any) {
        /**
         * se van a añadiendo al arreglo si se se selecciona el checkBox
         */
        console.log(this.openingElementsTargetSelected);
        let index = this.openingElementsTargetSelected.openingComponentCellList.indexOf(event.data);
        if (!(index > -1)) {
            this.openingElementsTargetSelected.openingComponentCellList.push(event.data);
            this.SelectedIndicador(this.openingElementsTargetSelected.id, true);
        }

    }

    SelectedIndicador(event: string, status: boolean) {
        /**
         * activa o desactiva el indicador para saber si tiene aperturas seleccionadas
         */
        switch (event) {
            case 'business_type': this.Selected[0] = status;
                break;
            case 'city': this.Selected[1] = status;
                break;
            case 'customer': this.Selected[2] = status;
                break;
            case 'door_type': this.Selected[3] = status;
                break;
            case 'kam': this.Selected[4] = status;
                break;
            case 'id_store': this.Selected[5] = status;
                break;
            case 'Refiller': this.Selected[6] = status;
                break;
            case 'retailer': this.Selected[7] = status;
                break;
            case 'state': this.Selected[8] = status;
                break;
            case 'supervisor': this.Selected[9] = status;
                break;
            case 'brand': this.Selected[10] = status;
                break;
            case 'codelc': this.Selected[11] = status;
                break;
            case 'CATEGORY': this.Selected[12] = status;
                break;
            case 'descripcion': this.Selected[13] = status;
                break;
            case 'grand_brand': this.Selected[14] = status;
                break;
            case 'npd_category': this.Selected[15] = status;
                break;
            case 'product_type': this.Selected[16] = status;
                break;
            case 'product_status': this.Selected[17] = status;
                break;
            case 'sap_category': this.Selected[18] = status;
                break;
            case 'upcelc': this.Selected[19] = status;
                break;
        }
    }

    onRowUnselect(event: any) {
        /**
         * Se van eliminando del Arreglo si se deselecciona el checkbox
         */
        console.log(event);
        let index = this.openingElementsTargetSelected.openingComponentCellList.indexOf(event.data);
        if (index > -1) { // Si el elemento ya existe, lo elimino
            this.openingElementsTargetSelected.openingComponentCellList.splice(index, 1);
            console.log('tam -> ' + this.openingElementsTargetSelected.openingComponentCellList.length);
            if (this.openingElementsTargetSelected.openingComponentCellList.length > 0) {} else {
                this.SelectedIndicador(this.openingElementsTargetSelected.id, false);
            }
        }
    }

    onMoveToSource(event: any) {
        this.openingElementsTargetSelected.openingComponentCellList = [];
        this.selectedFinalValues = [];
        this.openingComponentSelected = null;

    }

    onHeaderCheckboxToggle(event: any) {
        console.log('La lista está: ', event.checked);
        if(event.checked === true){// La lista se ha seleccionado completa.
            this.selectedFinalValues.forEach(elemento => {
                let index = this.openingElementsTargetSelected.openingComponentCellList.indexOf(elemento);
                if (index === -1) {// si el elemento no está, lo inserto
                    this.openingElementsTargetSelected.openingComponentCellList.push(elemento);
                }
            });
            // activamos los indicadores de aperturas
            this.SelectedIndicador(this.openingElementsTargetSelected.id, true);

        }else{// La lista se deseleccionó completa, lo que quiere decir que hay que eliminar todos los elementos que estaban en ella
         /*  this.openingComponentSelected.openingComponentCellList.forEach(elemento => {
                let index = this.openingElementsTargetSelected.openingComponentCellList.indexOf(elemento);
                if(index != -1){// Si el elemento ya está, lo borro
                    this.openingElementsTargetSelected.openingComponentCellList.splice(index,1);
                }
            }); */
            this.openingElementsTargetSelected.openingComponentCellList = [];
            // desactivamos los indicadores de aperturas
            this.SelectedIndicador(this.openingElementsTargetSelected.id, false);
        }

    }

    handleClick(event: any) {

        this.loading = true;
        if(!this.verificaCampos())
            return;
        let respBool: boolean;
        let respBlob: Blob;
        let openingElementList: OpeningElementList = new OpeningElementList();
        openingElementList.openingElementList = this.openingElementsTarget;
        openingElementList.fuenteSeleccionada = this.fuenteSeleccionada;
        openingElementList.opcionesSeleccionadas = this.opcionesSeleccionadas;
        openingElementList.rangeDates = this.rangeDates;
        openingElementList.rangoTiempoSelected = this.rangoTiempoSelected;
        openingElementList.sumarPeriodos = this.sumarPeriodos;
        console.log(openingElementList.openingElementList);
        openingElementList.openingElementList = openingElementList.openingElementList.filter( element => {
            return element.openingComponentCellList.length > 0;
        });

        if(!openingElementList.openingElementList || openingElementList.openingElementList.length === 0){
            this.msgs.push({severity: 'error', summary: 'Error.', detail: 'No ha incluido ningún valor en la(s) apertura(s) seleccionada(s)'});
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No ha incluido ningún valor en la(s) apertura(s) seleccionada(s)'});

            this.loading = false;
            return;
        }
        let MaxBrand = 0;
//let MaxUPC = 0;
//let MaxDescription = 0;
//let MaxCodELC = 0;
        openingElementList.openingElementList.forEach((v)=>{
            console.log(v.name);

            if(v.name == 'Brand'){
                MaxBrand = v.openingComponentCellList.length;
            }else{
                if(v.openingComponentCellList.length > 25){
                    v.all = true;
                }
            }

        });
        /*
            if(MaxBrand > 12){
              this.messageService.add({severity: 'error', summary: 'Operación fallida', detail: 'No se puede incluir mas de 12 Brands'});
              this.loading = false;
              return;

            }

                if(MaxDescription > 25){
                  this.messageService.add({severity: 'error', summary: 'Operación fallida', detail: 'No se puede incluir mas de 25 Description'});
                  this.loading = false;
                  return;
                }

                 if(MaxCodELC > 25){
                   this.messageService.add({severity: 'error', summary: 'Operación fallida', detail: 'No se puede incluir mas de 25 Cod. ELC'});
                   this.loading = false;
                   return;
                 }
                 if(this.openingElementsTargetSelected.openingComponentCellList.length > 25 ){
                   this.messageService.add({severity: 'error', summary: 'Operación fallida', detail: 'No se puede incluir mas de 25 valores'});

                   this.loading = false;
                   return;
                 }
             */


        this.blockUI.start('Cargando...'); // Start blocking

        console.log('send ->' + JSON.stringify(openingElementList));
        this.openingComponentService.generaExcelOk(openingElementList)
            .subscribe(resp => {
                this.blockUI.stop();
                respBlob = resp;
                let ahora: Date = new Date();
                let nombreFile = 'Reporte_Dato_Fuente_'+this.fuenteSeleccionada.id+'_'+ahora.getFullYear()+ahora.getMonth()+ahora.getDate()+ahora.getHours()+ahora.getMinutes()+ahora.getSeconds()+'.xlsx';
                this.save(respBlob,nombreFile);
                this.loading = false;
                console.log('Se realizó el post correctamente');
                this.messageService.add({severity: 'success', summary: 'Operación exitosa', detail: 'El fichero excel se generó exitosamente'});
            },error =>{
                this.blockUI.stop();
                this.loading = false;
                console.log('Ocurrió el siguiente error al intentar enviar el post al rest: ' + error);
                this.messageService.add({severity: 'error', summary: 'Operación errónea', detail:error});
            })


    }

    save(data, fileName) {
        let blob = new Blob([data], { type: 'application/vnd.ms-excel'});
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
    }

    onChangeFuentes(event: any) {
        let fuente: FuenteModel = event.value;
        this.rangosTiempo = undefined;
        if(fuente){
            if(fuente.id === 'SELL'){
                this.rangosTiempo = this.rangosTiempoSellout;

            }else{
                this.rangosTiempo = this.rangosTiempoStock;
            }
        }
    }

    verificaCampos(): boolean{
        this.msgs = [];
        let ret: boolean = true;
        if(!this.fuenteSeleccionada){
            this.msgs.push({'severity': 'error', summary: 'Error.', detail: 'Debe seleccionar una fuente'});
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe seleccionar una fuente'});
            ret = false;
            this.loading = false;
        }
        if(!this.opcionesSeleccionadas || this.opcionesSeleccionadas.length === 0){
            this.msgs.push({severity: 'error', summary: 'Error.', detail: 'Debe seleccionar una opción al menos'});
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe seleccionar una opción al menos'});

            ret = false;
            this.loading = false;
        }
        if(!this.rangeDates || this.rangeDates.length === 0){
            this.msgs.push({severity: 'error', summary: 'Error.', detail: 'Debe seleccionar un rango de fechas'});
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe seleccionar un rango de fechas'});

            ret = false;
            this.loading = false;
        }
        if(!this.rangoTiempoSelected){
            this.msgs.push({severity: 'error', summary: 'Error.', detail: 'Debe seleccionar un tipo de rango de fechas'});
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe seleccionar un tipo de rango de fechas'});

            ret = false;
            this.loading = false;
        }

        return ret;
    }
}
