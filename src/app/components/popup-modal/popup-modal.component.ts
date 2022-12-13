import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MtxGridColumn } from 'src/app/custom-table/models';
import { CustomTableService } from 'src/app/custom-table/service/custom-table.service';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent implements OnInit {

  public keys: string[] = [];
  public types:any ={};
  public columns: MtxGridColumn[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public row: any,
    public service: CustomTableService,
  ) {
    this.setData(row)

  }
  ngOnInit(): void {
  }
  setData(value: any) {
    let row = value.row
    let types:any={}
    this.columns = value.columns
    this.columns.forEach(column => {
      if (column.type == 'selection') {
        types[column.field] = column.type;
        let temp = row[column.field];
        row[column.field] = {
          value: temp,
          options:column.options
        }

      }
      else {
        types[column.field] = column.type;
      }
    })
    this.types = types;
    let key = Object.keys(row).filter(key => !(['editable', 'editmodal', 'deleterow'].includes(key)));
    this.keys = key;
  }
}
