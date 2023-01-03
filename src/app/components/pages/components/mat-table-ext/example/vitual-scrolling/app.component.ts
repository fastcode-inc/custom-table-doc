import { Component } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';
import { MTExColumn, RowSelectionChange } from '../../types';
import { MatTableDataSource } from '@angular/material/table';
import { CustomTableService } from 'src/app/custom-table/service/custom-table.service';

@Component({
  selector: 'data-grid-example',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
  onScroll(event: any) {
    let pageLimit: number = 10;
    let scrollHeight = event.target.scrollHeight;
    let scrollTop = event.target.scrollTop;
    let clientHeight = event.target.clientHeight;
    let scrollPosition = scrollHeight - (scrollTop + clientHeight);
    console.log('scrollPosition', scrollPosition);
    if (scrollPosition <= 5) {
      this.loadPage(pageLimit);
    }
  }
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
  onSelectionChange(event: RowSelectionChange) {
    console.log("Selection Change: ", event)
  }
}
