import { Component, ViewChild } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';
import { MatTableDataSource } from '@angular/material/table';
import { MTExColumn } from '../../types';

@Component({
    selector: 'data-grid-example',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  columns: MTExColumn[] = [
    { header: 'Position', field: 'position', width: '200px',type:'string' },
    { header: 'Name', field: 'name', width: '200px', type: 'string' },
    { header: 'Weight', field: 'weight', width: '200px', type: 'string' },
    { header: 'Symbol', field: 'symbol', width: '200px', type: 'string' },
    { header: 'Gender', field: 'gender', width: '200px', type: 'selection',options:['male','female'] }
  ];

  list = new MatTableDataSource(EXAMPLE_DATA);
}
