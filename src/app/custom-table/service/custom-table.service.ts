import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { MtxGridColumn } from '../models';
import data from 'src/assets/data.json';
import { HttpClient } from '@angular/common/http';
const companyData = data as any[];
@Injectable({
  providedIn: 'root'
})
export class CustomTableService {

  constructor(
    public http:HttpClient
  ) { }
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
  getResults(offset: number, limit: number): Observable<any> {
    return of(companyData.slice(offset, offset + limit)).pipe(
      map(d => ({ data: d }))
    );
  }
  getData(offset: number, limit: number): Observable<any> {
    return this.http.get(`https://api.instantwebtools.net/v1/passenger?page=${offset}&size=${limit}`).pipe(delay(2000));
  }
}
