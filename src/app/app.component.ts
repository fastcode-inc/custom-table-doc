import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MTExColumn, RowSelectionChange } from './models/tableExtModels';
import { CustomTableService } from './service/custom-table.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;
  public dataSource: any;
  stickyColumn: any = false;
  columnResizable: any = false;
  stickyFooter: any = false;
  stickyHeader: any = false;
  inlineRowEditing: any = true;
  popupRowEditing: any = true;
  inCellEditing: any = false;
  deleteRow: any = false;
  stripedRows: any = false;
  rowSelection: any = false;
  multiRowSelection: any = false;
  simpleFilter: any = false;
  selectionFilter: any = false;
  toolbarToggle: any = false;
  toolbarHeight: string = '';
  showFirstLastButtons: any = false;
  columnPinnable: any = false;
  columnHidable: any = false;
  exportButtonEnable: any = false;
  @ViewChild('cellTemplate1') cellTemplate1!: TemplateRef<any>;
  @ViewChild('cellTemplate2') cellTemplate2!: TemplateRef<any>;

  public columns: MTExColumn[] = [
    {
      header: 'ID',
      field: 'id',
      type: 'number',
      headerTooltip: { value: 'ID', tooltipPosition: 'above' },
      width: '',
    },
    { header: 'Name', field: 'name', type: 'string' },
    { header: 'Age', field: 'age', type: 'date' },
    {
      header: 'Gender',
      field: 'gender',
      type: 'selection',
      options: ['male', 'female'],
    },
    { header: 'Address', field: 'address', type: 'string' },
    // ]
    //   public columns: MTExColumn[] = [
    //     { header: 'ID', field: 'id' , width:'250px'},
    //     { header: 'Name', field: 'name', width: '250px'},
    //     { header: 'Weight', field: 'weight', width: '250px'},
    //     { header: 'Symbol', field: 'symbol', width: '250px', options:['A','B','C','D','E','F']},
    // ]

    // public columns: MTExColumn[] = [
    //     { header: '', field: 'position', type:'string' },
    //   { header: 'Name', field: 'name', type: 'string' },
    //   { header: 'tags', field: 'tag.0.value', type: 'string' },
    //   { header: 'Weight', field: 'weight', type: 'string' },
    // { header: 'Symbol', field: 'symbol', type: 'string' },
    // { header: 'Gender', field: 'gender', type: 'string' },
    // { header: 'Mobile', field: 'mobile', type: 'string' },
    // { header: 'City', field: 'city', type: 'string' },
    // { header: 'Address', field: 'address', type: 'string' },
    // { header: 'Date', field: 'date', type: 'string' },
    // { header: 'Website', field: 'website', type: 'string' },
    // { header: 'Company', field: 'company', type: 'string' },
    // { header: 'Email', field: 'email', type: 'string' },
    //   { header: 'Status', field: 'status', type: 'boolean',  },
  ];
  multiSelectRow: any = true;
  topSearchFilter: any = false;
  tableHeight: string = '40vh';
  tableWidth: string = '';
  isExpandEnable: any = false;
  dragEnable: any = false;
  sorting: any = false;
  infiniteScroll: any = false;
  scrollbarH: any = false;
  paginationEnable: any = true;
  headerTemplateRefCtrl: any = false;
  cellTemplateRefCtrl: any = false;
  toolbarTemplateRefCtrl: any = false;
  popupTemplateRefCtrl: any = true;
  inlineTemplateRefCtrl: any = true;
  cellEditingTemplateRefCtrl: any = true;
  constructor(public service: CustomTableService) {
    this.loadPage(10);
  }

  ngOnInit(): void { }
  
  showhidecolumn(op: string) {
    switch (op) {
      case 'inlineRowEditing': {
        this.inlineRowEditing = !this.inlineRowEditing;
        break;
      }
      case 'popupRowEditing': {
        this.popupRowEditing = !this.popupRowEditing;
        break;
      }
      case 'enableDelete': {
        this.deleteRow = !this.deleteRow;
        break;
      }
      case 'select': {
        this.multiRowSelection = !this.multiRowSelection;
        break;
      }
    }
  }

  showData(event: any, property: string) {
    console.log(property, event);
  }

  onScroll(event: any) {
    let pageLimit: number = 10;
    let scrollHeight = event.target.scrollHeight;
    let scrollTop = event.target.scrollTop;
    let clientHeight = event.target.clientHeight;
    let scrollPosition = scrollHeight - (scrollTop + clientHeight);
    console.log('scrollPosition', scrollPosition);
    if (scrollPosition <= 5 && this.infiniteScroll) {
      this.loadPage(pageLimit);
    }
  }

  loadPage(limit: number) {
    this.isLoading = true;
    let offset = this.dataSource ? this.dataSource.data.length : 0;
    this.service.getResults(offset, limit).subscribe((results) => {
      if (this.dataSource) {
        const rows = [...this.dataSource.data, ...results.data];
        this.dataSource = new MatTableDataSource(rows);
      } else {
        const rows = [...results.data];
        this.dataSource = new MatTableDataSource(rows);
      }
      this.isLoading = false;
    });
  }

  onSelectionChange(event: RowSelectionChange) {
    console.log('Selection Change: ', event);
  }
}
