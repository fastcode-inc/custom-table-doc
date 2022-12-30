import { Component } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';
import { MtxGridColumn } from 'src/app/models/tableExtModels';

@Component({
  selector: 'data-grid-example',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  columns: MtxGridColumn[] = [
    { header: 'Name', field: 'name',type:'string' },
    {
      header: 'Weight',
      field: 'weight',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.2-2',
      },
    },
    { header: 'Gender', field: 'gender', type:'selection' ,options:['Male','Female'] },
    { header: 'Mobile', field: 'mobile',type:'string' },
    { header: 'City', field: 'city', type: 'string' },
    {
      header: 'Date',
      field: 'date',
      type: 'date',
      typeParameter: {
        format: 'yyyy-MM-dd',
      },
    },
  ];

  list = EXAMPLE_DATA;

  trackByName(index: number, item: any) {
    return item.name;
  }
}
