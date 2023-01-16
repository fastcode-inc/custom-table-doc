import { Component } from '@angular/core';
import { EXAMPLE_DATA3 } from '../../data';
import { MTExColumn } from '../../types';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'data-grid-example',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  columns: MTExColumn[] = [
    { header: 'Name', field: 'name', type: 'string' },
    { header: 'Weight', field: 'weight', type: 'string' },
    { header: 'Gender', field: 'gender', type: 'selection', options: ['male', 'female'], },
    { header: 'Mobile', field: 'mobile', type: 'string' },
    { header: 'City', field: 'city', type: 'string' },
    { header: 'Cost', field: 'cost', type: 'string' },
  ];

  list = new MatTableDataSource(EXAMPLE_DATA3);
}
