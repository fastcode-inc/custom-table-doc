import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MtxGridColumn } from 'src/app/custom-table/models';

@Component({
  selector: 'app-filter-columns-component',
  templateUrl: './filter-columns-component.component.html',
  styleUrls: ['./filter-columns-component.component.scss']
})
export class FilterColumnsComponentComponent implements OnInit {
  @Input() obj!: any;
  @Output() filterOutput: EventEmitter<any> = new EventEmitter<any>;
  stringCtrl: FormControl = new FormControl;
  numberCtrl: FormControl = new FormControl;
  dateCtrl: FormControl = new FormControl;
  booleanCtrl: FormControl = new FormControl;
  selectionCtrl: FormControl = new FormControl;



  public type: any;
  constructor() { }
  ngOnInit(): void {
    this.stringCtrl.valueChanges.subscribe((value) => { 
      if (value || value == '') {
          this.emitOutput(value);
        }
    })
    this.dateCtrl.valueChanges.subscribe((value) => { 
      if (value || value == '') {
          this.emitOutput(value);
        }
    })
    this.numberCtrl.valueChanges.subscribe((value) => { 
      if (value || value == '') {
          this.emitOutput(value);
        }
    })
    this.booleanCtrl.valueChanges.subscribe((value) => { 
      if (value || value == '') {
          this.emitOutput(value);
        }
    })
    this.selectionCtrl.valueChanges.subscribe((value) => { 
      if (value || value == '') {
          this.emitOutput(value);
        }
    })
  }

  emitOutput(value: any){
    let obj = { [this.obj.field]: value }
    this.filterOutput.emit(obj);
   }
}
