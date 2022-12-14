import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MtxGridColumn } from 'src/app/custom-table/models';

@Component({
  selector: 'app-column-pinning',
  templateUrl: './column-pinning.component.html',
  styleUrls: ['./column-pinning.component.scss']
})
export class ColumnPinningComponent implements OnInit {
  @Input() columns!: MtxGridColumn[];
  @Output() columnsChanged: EventEmitter<MtxGridColumn[]> = new EventEmitter();
  public icons = {
    left: "pinLeft",
    right: "pinRight",
    none: "pinNone",
  };
  public index: number = 0;


  constructor() { }
  ngOnInit(): void {
  }
  changeValue(column: MtxGridColumn) {
    if (column.pinned) {
      if (column.pinned == 'left') {
        this.setColumnPinValue(column, 'right');
      } else if (column.pinned == 'right') {
        this.setColumnPinValue(column, undefined);
      }
    }
    else {
      this.setColumnPinValue(column, 'left');
    }
    this.columnsChanged.emit(this.columns);
  }
  setColumnPinValue(column: MtxGridColumn, value: 'left' | 'right' | undefined) {
    this.columns.forEach(col => {
      if (column?.header == col.header) {
        col.pinned = value;
      }
    })
  }
}
