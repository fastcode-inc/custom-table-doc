import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of } from 'rxjs';
import data from 'src/assets/data.json';
import { HttpClient } from '@angular/common/http';
const companyData = data as any[];
@Injectable({
  providedIn: 'root',
})
export class CustomTableService {
  public selectedRow = new BehaviorSubject<any>(null);
  public selectedRowIndex = new BehaviorSubject<any>(null);
  constructor(public http: HttpClient) {}
  getResults(offset: number, limit: number): Observable<any> {
    return of(companyData.slice(offset, offset + limit)).pipe(
      delay(new Date(Date.now() + 250)),
      map((d) => ({ data: d }))
    );
  }
  getData(offset: number, limit: number): Observable<any> {
    return this.http
      .get(
        `https://api.instantwebtools.net/v1/passenger?page=${offset}&size=${limit}`
      )
      .pipe(delay(2000));
  }
}
