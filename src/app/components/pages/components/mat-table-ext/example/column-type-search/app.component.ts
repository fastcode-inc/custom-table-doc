import { Component } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';
import { MTExColumn } from '../../types';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'data-grid-example',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  columns: MTExColumn[] = [
    { header: 'Name', field: 'name',type:'string' },
    {
      header: 'Weight',
      field: 'weight',
      type: 'number',
    },
    { header: 'Gender', field: 'gender', type:'selection' ,options:['male','female'] },
    {
      header: 'Date',
      field: 'date',
      type: 'date'
    },
    {
      header: 'Status',
      field: 'status',
      type: 'boolean'
    },
  ];

  list = new MatTableDataSource(EXAMPLE_DATA);
}
