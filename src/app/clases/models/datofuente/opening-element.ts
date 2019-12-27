import {OpeningComponentCell} from '../../openingcomponents/opening-component-cell';

export class OpeningElement {
  id: string;
  name : string;
  type : string;
  all: boolean;
  openingComponentCellList : Array<OpeningComponentCell>;

  constructor(){
    this.openingComponentCellList = [];
  }
}
