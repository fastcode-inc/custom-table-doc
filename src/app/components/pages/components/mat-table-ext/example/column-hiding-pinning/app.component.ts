import { Component, ViewChild } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';
import { MatTableDataSource } from '@angular/material/table';
import { MTExColumn } from '../../types';

@Component({
  selector: 'data-grid-example',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('grid') grid!: any;

  columns: MTExColumn[] = [
    { header: 'Position', field: 'position', width: '200px',type:'string' },
    { header: 'Name', field: 'name', width: '200px', pinned: 'left', type: 'string' },
    { header: 'Weight', field: 'weight', width: '200px', pinned: 'left', type: 'string' },
    { header: 'Symbol', field: 'symbol', width: '200px', type: 'string' },
    { header: 'Gender', field: 'gender', width: '200px', type: 'selection',options:['male','female'] },
    { header: 'Mobile', field: 'mobile', width: '200px', type: 'string' },
    { header: 'Tele', field: 'tele', width: '200px', type: 'string' },
    { header: 'City', field: 'city', width: '200px', type: 'string' },
    { header: 'Address', field: 'address', width: '200px', type: 'string' },
    { header: 'Date', field: 'date', width: '200px', type: 'string' },
    { header: 'Website', field: 'website', width: '200px', type: 'string' },
    { header: 'Company', field: 'company', width: '200px', type: 'string' },
    { header: 'Email', field: 'email', width: '200px', pinned: 'right', type: 'string' },
    { header: 'Status', field: 'status', type: 'boolean', width: '200px' },
  ];

  list = new MatTableDataSource(EXAMPLE_DATA);

  columnPinnable = true;
  columnHideable = true;
  columnHideableChecked: 'show' | 'hide' = 'show';

  closeMenu() {
    this.grid.columnMenu.menuTrigger.closeMenu();
  }

  log(e: any) {
    console.log(e);
  }
}
