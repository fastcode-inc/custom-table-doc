import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';
import { MTExColumn } from '../../types';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'data-grid-example',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<any>;

  columns: MTExColumn[] = [];

  list = new MatTableDataSource(EXAMPLE_DATA);

  ngOnInit() {
    this.columns = [
      { header: 'Name', field: 'name', type: 'string' },
      { header: 'Weight', field: 'weight', type: 'string' },
      { header: 'Gender', field: 'gender', type: 'selection',options:['male','female'] },
      { header: 'Mobile', field: 'mobile', type: 'string' },
      { header: 'City', field: 'city', type: 'string' },
      { header: 'Status', field: 'status', type: 'string', cellTemplate: this.statusTpl },
    ];
  }
}
