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
    {
      header: 'Name',
      field: 'name',
      minWidth: '200px',
      maxWidth: '300px',
      type: 'string'
    },
    {
      header: 'Weight',
      field: 'weight',
      minWidth: '200px',
      type:'string'
    },
    {
      header: 'Gender',
      field: 'gender',
      width: '100px',
      resizable: false,
      type: 'string'
    },
    {
      header: 'Mobile',
      field: 'mobile',
      maxWidth: 'px',
      type: 'string'
    },
    {
      header: 'City',
      field: 'city',
      minWidth: '200px',
      type: 'string'
    },
  ];
  columnResizable = false;
  list = new MatTableDataSource([...EXAMPLE_DATA, ...EXAMPLE_DATA, ...EXAMPLE_DATA]);
}
