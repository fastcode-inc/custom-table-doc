import { Component } from '@angular/core';
import { MTExColumn } from '../../types';
import { MatTableDataSource } from '@angular/material/table';
import { CustomTableService } from 'src/app/service/custom-table.service';
import { MTExColumnGroup } from 'src/app/models/tableExtModels';

@Component({
    selector: 'data-grid-example',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  constructor(public service: CustomTableService,) {
    this.loadPage(10);
  }
  columns: MTExColumn[] = [
    { header: 'ID', field: 'id', type: 'number' },
    { header: 'Name', field: 'name', type: 'string' },
    { header: 'Gender', field: 'gender', type: 'selection', options: ['male', 'female'] },
    { header: 'Age', field: 'age', type: 'string' },
  ];


  list = new MatTableDataSource;
  isLoading: boolean = false;
  loadPage(limit: number) {
    this.isLoading = true;
    let offset = this.list ? this.list.data.length : 0;
    this.service.getResults(offset, limit).subscribe(results => {
      if (this.list) {
        const rows = [...this.list.data, ...results.data];
        this.list = new MatTableDataSource(rows);
      }
      else {
        const rows = [...results.data];
        this.list = new MatTableDataSource(rows);
      }
      this.isLoading = false;
    });
  }
}
