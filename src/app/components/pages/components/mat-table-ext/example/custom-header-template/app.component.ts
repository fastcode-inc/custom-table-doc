import { Component } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';
import { MatTableDataSource } from '@angular/material/table';
import { MTExColumn } from '../../types';

@Component({
  selector: 'data-grid-example',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  columns: MTExColumn[] = [
    { header: 'Name', field: 'name', description: 'Info about the name',type: 'string'},
    { header: 'Weight', field: 'weight', description: 'Info about the weight', type: 'string' },
    { header: 'Gender', field: 'gender', description: 'Info about the gender', type: 'string' },
    { header: 'Mobile', field: 'mobile', description: 'Info about the mobile', type: 'string' },
    { header: 'City', field: 'city', description: 'Info about the city', type: 'string' },
  ];

  list = new MatTableDataSource(EXAMPLE_DATA);
}
