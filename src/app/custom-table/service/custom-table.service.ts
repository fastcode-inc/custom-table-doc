import { Injectable } from '@angular/core';
import { MtxGridColumn } from '../modals';

@Injectable({
  providedIn: 'root'
})
export class CustomTableService {

  constructor() { }
  removeUnit(value:string):number {
    if (typeof value == 'string') {
      let expression = /\d+/g;
      let res = value.match(expression);
      if (!(res)) {
        return 0;
      }
      let result = parseInt(res[0]);
      return (result);
    }
    else {
      return 0;
    }
  }
  getUnit(value:string) {
    if (value) {
      if (value) {
        let expression = /\d+/g;
        let unit = value.replace(expression, '');
        if (unit) {
          if (unit) {
            return (unit);
          }
          else {
            return "px";
          }
        }
        else {
          return 'px'
        }
      }

      else {
        return "px";
      }
    }
    else {
      return 'px'
    }
  }
  returnDataType(val: any, column: MtxGridColumn) {
    if (column.options) {
      return 'selection';
    } else {
      return typeof val[column.field];
    }
  }
}
