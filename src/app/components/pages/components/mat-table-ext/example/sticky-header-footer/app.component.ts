import { Component } from '@angular/core';
import { EXAMPLE_DATA2 } from '../../data';
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
    { header: 'Position', footerText: 'Position', field: 'position', type: 'string' },
    { header: 'Name', footerText: 'Name', field: 'name', type: 'string' },
    { header: 'Symbol', footerText: 'Symbol', field: 'symbol', type: 'string' },
    {
      header: 'Weight', footerText: 'Weight',
      field: 'weight',
      type: 'number',
    },

  ];
  stickyHeader = true;
  stickyFooter = true
  list = new MatTableDataSource(EXAMPLE_DATA2);
}
