
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EXAMPLE_DATA } from 'src/assets/data';
import { MtxGridColumn } from './custom-table/modals';
import { MatIconRegistry } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {
  public dataSource:any;
  stickyColumn: any = false;
  columnResizable: any = false;
  stickyFooter: any = false;
  stickyHeader: any = false;
  inlineRowEditing: any = false;
  popupRowEditing: any = false;
  deleteRow: any = false;
  rowSelection: any = false;
  multiRowSelection: any = false;
  simpleFilter: any = false;
  selectionFilter: any = false;
  columnFilterBySelection: any = true;

  public columns: MtxGridColumn[] = [
    { header: 'ID', field: 'id' , width:'250px',headerTooltip:"this is the ID of the column"},
    { header: 'Name', field: 'name', width: '250px',cellTooltip: 'this is the name of the column'},
    { header: 'Weight', field: 'weight', width: '250px' },
    { header: 'Symbol', field: 'symbol', width: '250px' , headerTooltip:"this is the symbol of the column"},
]


  editGridmodal: any = false;
  addremoveColumns: any = false;
  toggleColumnfilter: any = false;
  multiSelectRow: any = true;
  topSearchFilter: any = false;
  isExpandEnable: any = false;
  dragEnable: any = false;
  paginationEnable: any = true;
  constructor(
    public domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry,
    
  ) {
    this.dataSource = EXAMPLE_DATA;
    this.addIconsToRegistery();
   }
  
  ngOnInit(): void { }
  addIconsToRegistery() {
    let iconNames = ['pinned','unPinned']
    iconNames.forEach(icon => {
      this.matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/customIcons/${icon}.svg`));
    })
  }
  showhidecolumn(op:string) {
    switch (op) {
      case 'inlineRowEditing': {
        this.inlineRowEditing = !(this.inlineRowEditing);
        break;
      }
      case 'popupRowEditing': {
        this.popupRowEditing = !(this.popupRowEditing);
        break;
      }
      case 'enableDelete': {
        this.deleteRow = !(this.deleteRow);
        break;
      }
      case 'select': {
        this.multiRowSelection = !(this.multiRowSelection);
        break;
      }
    }
  }
}

