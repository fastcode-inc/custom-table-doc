import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomTableService } from 'src/app/custom-table/service/custom-table.service';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent implements OnInit {

  public keys: string[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public row: any,
    public service: CustomTableService,
  ) {
    this.setData(row)

  }
  ngOnInit(): void {
  }
  setData(row: any) {
    let key = Object.keys(row).filter(key => !(['editable', 'editmodal', 'deleterow'].includes(key)));
    console.log(key);
    this.keys = key;
  }
  returnDataType(val: any, key:string) {
    if (val.options) {
      return 'selection';
    } else {
      return typeof val[key];
    }
  }
  saveData() {
    
  }
}
