import { Component } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';
import { MTExColumn, MTExRowSelectionFormatter } from '../../types';
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
    { header: 'Gender', field: 'gender', type: 'selection', options: ['male', 'female'] },
    { header: 'Mobile', field: 'mobile', type: 'string' },
    { header: 'City', field: 'city', type: 'string' },
  ];

  list = new MatTableDataSource(EXAMPLE_DATA);

  multiSelectable = true;
  hideRowSelectionCheckbox = false;
  rowSelectable = true;
  rowSelected = EXAMPLE_DATA.slice(2, 3);
  rowSelectionFormatter: MTExRowSelectionFormatter = {
    disabled: data => data.name === 'Boron',
    hideCheckbox: data => data.name === 'John',
  };

  log(e: any) {
    console.log(e);
  }
}
