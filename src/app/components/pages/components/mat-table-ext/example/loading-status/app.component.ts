import { Component } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';
import { MTExColumn } from 'src/app/models/tableExtModels';
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
    { header: 'Gender', field: 'gender', type: 'selection', options: ['Male', 'Female'] },
    { header: 'Mobile', field: 'mobile', type: 'string' },
    { header: 'City', field: 'city', type: 'string' },
  ];

  list = new MatTableDataSource(EXAMPLE_DATA);

  isLoading = true;
}
