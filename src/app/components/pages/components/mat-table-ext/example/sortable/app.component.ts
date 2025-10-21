import { Component } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';
import { MTExColumn } from '../../types';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'data-grid-example',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  columns: MTExColumn[] = [
    { header: 'Name', field: 'name', sortable: true, type: "string" },
    { header: 'Weight', field: 'weight', sortable: true, type: "string" },
    { header: 'Gender', field: 'gender', sortable: true, type: "selection", options: ['male', 'female'] },
    { header: 'Mobile', field: 'mobile', sortable: false, type: "string" },
    {
      header: 'City',
      field: 'city',
      sortable: true,
      type: "string",
    },
  ];

  list = new MatTableDataSource(EXAMPLE_DATA);

  log(e: any) {
    console.log(e);
  }
}
