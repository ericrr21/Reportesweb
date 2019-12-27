import {OpeningElement} from './opening-element';
import {FuenteModel} from './fuente-model';

export class OpeningElementList {
  openingElementList : OpeningElement[];
  fuenteSeleccionada : FuenteModel;
  opcionesSeleccionadas : FuenteModel[];
  rangeDates: Date[];
  rangoTiempoSelected : FuenteModel;
  sumarPeriodos : boolean = false;


  constructor(){

  }
}
