import {OpeningComponentCell} from './opening-component-cell';

export class OpeningComponent {
  openingComponentCellList : OpeningComponentCell[];
  name : string;

  constructor(openingComponentCellList : Array<OpeningComponentCell>,
              name : string){
    this.name = name;
    this.openingComponentCellList = openingComponentCellList;
  }
}
