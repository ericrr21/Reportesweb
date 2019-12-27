import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import {ConfirmationService, Message, MessageService, SelectItem} from 'primeng/api';
import {BreadcrumbService} from '../../../breadcrumb.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { NG_VALUE_ACCESSOR} from '@angular/forms';
import {ControlValueAccessor} from '@angular/forms';

// let viewChild = ViewChild(SignaturePad);

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  providers: [MessageService,
      ConfirmationService,
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => RegistroUsuarioComponent),
          multi: true,
      },]
})
export class RegistroUsuarioComponent implements OnInit, ControlValueAccessor{
    sexos: SelectItem[];
    sexoSeleccionado: any;
    numTelef: any;
    nacionalidadSeleccionada: any;
    nacionalidades: SelectItem[];
    estadoCivSeleccionado: any;
    estadosCiviles: SelectItem[];
    private display = false;
    pass0: string = ' ';
    pass1: string = ' ';
    match: boolean = true;
    msgs: Message[];
    uploadedFiles: any[] = [];
    es: any;

    public options = {};
    public _signature: any = null;
    public propagateChange: Function = null;
    @ViewChild(SignaturePad, {static: false}) public signaturePad: SignaturePad;
    private signaturePadOptions = { // passed through to szimek/signature_pad constructor
        minWidth: 50,
        canvasWidth: 800,
        canvasHeight: 600
    };
    private static SignatureFieldComponent: any;

    constructor(private breadcrumbService: BreadcrumbService, private messageService: MessageService,
                private confirmationService: ConfirmationService) {
        this.breadcrumbService.setItems([
            { label: 'Registro de nuevos usuarios', routerLink: ['/afiliacion'] }
        ]);

    }

  ngOnInit() {
      this.sexos = [];
      this.sexos.push({label: '', value: 0});
      this.sexos.push({label: 'Masculino', value: {id: 1, name: 'Masculino', code: 'M'}});
      this.sexos.push({label: 'Femenino', value: {id: 2, name: 'Femenino', code: 'F'}});

      this.nacionalidades = [];
      this.nacionalidades.push({label: '', value: 0});
      this.nacionalidades.push({label: 'Mexicano', value: {id: 1, name: 'Mexicano', code: 'MX'}});
      this.nacionalidades.push({label: 'Cubano', value: {id: 2, name: 'Cubano', code: 'CU'}});
      this.nacionalidades.push({label: 'Venezolano', value: {id: 3, name: 'Venezolano', code: 'VN'}});
      this.nacionalidades.push({label: 'Otro', value: {id: 4, name: 'Otro', code: 'OTRO'}});

      this.estadosCiviles = [];
      this.estadosCiviles.push({label: '', value: 0});
      this.estadosCiviles.push({label: 'Soltero', value: {id: 1, name: 'Soltero', code: 'S'}});
      this.estadosCiviles.push({label: 'Casado', value: {id: 2, name: 'Casado', code: 'C'}});
      this.estadosCiviles.push({label: 'Viudo', value: {id: 3, name: 'Viudo', code: 'V'}});
      this.estadosCiviles.push({label: 'Divorciado', value: {id: 4, name: 'Divorciado', code: 'D'}});
      this.estadosCiviles.push({label: 'Concubinato', value: {id: 5, name: 'Casado', code: 'CO'}});

      this.es = {
          firstDayOfWeek: 1,
          dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
          dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
          dayNamesMin: [ "D","L","M","X","J","V","S" ],
          monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
          monthNamesShort: [ "ene","feb", 'mar', "abr","may","jun","jul","ago","sep","oct","nov","dic" ],
          today: 'Hoy',
          clear: 'Borrar'
      };
  }

    showDialog() {
        this.display = true;
    }
    closeDialog() {
        this.display = false;
    }

    mouseOutPass(event) {
        if (this.pass0 !== this.pass1) {
            this.match = false;
        } else {
            this.match = true;
        }
    }

    onUpload(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
// jsdlkjas
    get signature(): any {
        return this._signature;
    }

    set signature(value: any) {
        this._signature = value;
        console.log('set signature to ' + this._signature);
        console.log('signature data :');
        console.log(this.signaturePad.toData());
        this.propagateChange = this.signature;
    }

    public writeValue(value: any): void {
        if (!value) {
            return;
        }
        this._signature = value;
        this.signaturePad.fromDataURL(this.signature);
    }

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public registerOnTouched(): void {
        // no-op
    }

    public ngAfterViewInit(): void {
        this.signaturePad.clear();
    }

    public drawBegin(): void {
        console.log('Begin Drawing');
    }

    public drawComplete(): void {
        this.signature = this.signaturePad.toDataURL('image/jpeg', 0.5);
    }

    public clear(): void {
        this.signaturePad.clear();
        this.signature = '';
    }
}


