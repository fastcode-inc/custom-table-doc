import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, EventEmitter, HostListener, Output } from '@angular/core';
import { Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PopupModalComponent } from '../components/popup-modal/popup-modal.component';
import { RowChange, DisplayColumn, MtxGridColumn, MtxGridColumnPinOption, RowSelectionChange } from './models';
import { CustomTableService } from './service/custom-table.service';
@Component({
  selector: 'mat-table-ext',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CustomTableComponent implements OnInit, OnChanges,AfterViewInit {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild('columnMenuTrigger') columnMenuTrigger!: MatMenuTrigger;
  @ViewChild('selectSearchRow') toggleselectRow: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Table inputs
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() columns: MtxGridColumn[] = [];
  @Input() columnResizable: boolean = false;
  @Input() stripedRows: boolean = false;
  @Input() inlineRowEditing: boolean = false;
  @Input() inCellEditing: boolean = false;
  @Input() popupRowEditing: boolean = false;
  @Input() enableDelete: boolean = false;
  @Input() rowSelection: boolean = false;
  @Input() multiRowSelection: boolean = false;
  @Input() stickyColumns: boolean = false;
  @Input() stickyFooter: boolean = false;
  @Input() stickyHeader: boolean = false;
  @Input() columnFilter: boolean = false;
  @Input() selectionFilter: boolean = false;
  @Input() loadingIndicator: boolean = false;
  @Input() sorting: boolean = false;
  @Input() showToolbar: boolean = false;
  @Input() toolbarTitle: string = '';
  @Input() tableHeight: string = '500px';
  @Input() tableWidth: string = '100%';
  @Input() toolbarTempate: TemplateRef<any> | undefined;
  @Input() columnHideable: boolean = false;
  @Input() columnHideableChecked: 'show' | 'hide' = 'show';
  @Input() columnPinnable: boolean = false;
  @Input() globalSearch: boolean = false;
  @Input() expandRows: boolean = false;
  @Input() dndColumns: boolean = false;
  @Input() paginatorEnable: boolean = false;
  @Input() showFirstLastButtons: boolean = false;
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  

  // Table outputs
  @Output() inlineChange: EventEmitter<any> = new EventEmitter<RowChange>();
  @Output() cellChange: EventEmitter<any> = new EventEmitter<RowChange>();
  @Output() popupChange: EventEmitter<any> = new EventEmitter<RowChange>();
  @Output() rowDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() scroll: any = new EventEmitter<any>();
  @Output() selectionChanged: EventEmitter<RowSelectionChange> = new EventEmitter<any>();


  columnPinningOptions: MtxGridColumnPinOption[] = []
  exportMenuCtrl: boolean = false;
  columnPinMenuCtrl: boolean = false;
  hideShowMenuCtrl: boolean = false;
  editGridmodal: any = false;
  addremoveColumns: any = false;
  toggleColumnfilter: any = false;
  multiSelectRow: any = true;
  columnFilterBySelection: any = false;
  dragEnable: any = false;
  paginationEnable: any = true;
  rowDataTemp: any={};
  displayedColumns: string[] = [];
  showHideColumnsArray: MtxGridColumn[] = [];
  totalSelectionList: any = [];
  columnsList: string[] = [];
  columnsArray: MtxGridColumn[] = [];
  headersFilters: MtxGridColumn[] = [];
  headersFiltersIds: string[] = [];
  columnsListCtrl = new FormControl([]);
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  selection = new SelectionModel<any>(true, []);
  hiddenCtrl = new SelectionModel<any>(true, []);
  ELEMENT_DATA: any = [];
  filterValues: any = {};
  globalFilter = '';
  showHideFilter = '';
  singleFilter = "";
  individulFilter = ""
  filtersModel = [];
  filterKeys = {};
  toggleFilters = false;
  hideRows = false;
  expandedElement: any | null;
  currentRowIndex: number = -1;
  currentRow: any = {};
  cellEditing: any = {};
  hideShowMenuGroup!:FormGroup;
  dynamicDisplayedColumns: any[] = [
    { filter: false, name: 'select', show: false },
    { filter: false, name: 'edit', show: false },
    { filter: false, name: 'popup', show: false },
    { filter: false, name: 'delete', show: false }
  ];


  constructor(
    public dialog: MatDialog,
    public service: CustomTableService,
    public formBuildersService: FormBuilder
  ) {
    if (this.dataSource) {
      this.ELEMENT_DATA = this.dataSource.data;
    }

  }
  /**
   * Control column ordering and which columns are displayed.
   */
  ngOnChanges(changes: SimpleChanges) {
    this.setPropertyValue(changes);
  }
  ngOnInit() {
    if (this.dataSource) {
      this.dataSource.filterPredicate = this.createFilter();
    }
  }
  setColumnHideShow() {
    if (this.hideShowMenuGroup !== undefined && this.hideShowMenuGroup !== null) {
      this.updateColumnsHideShow(this.hideShowMenuGroup.value);
    }
  }
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  setPropertyValue(changes: SimpleChanges) {
    let keys = Object.keys(changes);
    keys.forEach(propetry => {
      switch (propetry) {
        case 'dataSource': {
          if (changes[propetry].currentValue) {
            this.ELEMENT_DATA = changes[propetry].currentValue.data;
            this.dataSource = changes[propetry].currentValue;
            this.reCal()
          } else {
            this.dataSource=new MatTableDataSource([{}])
          }
          break;
        }
        case 'columns': {
          this.setColumnsData(changes[propetry].currentValue)
          break;
        }
        case 'inlineRowEditing': {
          this.showHideColumn('edit', changes[propetry].currentValue);
          break;
        }
        case 'popupRowEditing': {
          this.showHideColumn('popup', changes[propetry].currentValue);
          break;
        }
        case 'enableDelete': {
          this.showHideColumn('delete', changes[propetry].currentValue);
          break;
        }
        case 'multiRowSelection': {
          this.showSelectionColumn('select', changes[propetry].currentValue);
          break;
        }
        case 'stickyColumns': {
          this.stickyColumns = changes[propetry].currentValue;
          break;
        }
        case 'stickyHeader': {
          this.stickyHeader = changes[propetry].currentValue;
          break;
        }
        case 'stickyFooter': {
          this.stickyFooter = changes[propetry].currentValue;
          break;
        }
        case 'columnFilter': {
          if (changes[propetry].currentValue) {
            this.headersFiltersIds=this.columnsArray.map((column,i) => column.field+'_'+i)
            let array:MtxGridColumn[] = []
            this.columnsArray.forEach((column,i) => { 
              let obj = {
                type: column?.type,
                field: column?.field + '_' + i
              }
              array.push(obj);
            })
            this.headersFilters = array;
            this.dataSource.filterPredicate = this.createFilter();
          }
          else {
            this.headersFilters = [];
            this.headersFiltersIds = [];
            this.dataSource.filter=''
          }
          this.toggleFilters = changes[propetry].currentValue;
          break;
        }
        case 'globalSearch': {
          if (changes[propetry].currentValue) {
            this.dataSource.filterPredicate = this.createFilter();
          }
          break;
        }
        case 'showToolbar': {
          if (changes['columns']) {
            this.setToolbarMenuControls(changes['columns'].currentValue);
          }
          else {
            this.setToolbarMenuControls(this.columnsArray);
          }
          break;
        }
        case 'expandRows': {
          this.expandRows = changes[propetry].currentValue;
          break;
        }
        case 'dndColumns': {
          this.dragEnable = changes[propetry].currentValue;
          break;
        }
        case 'paginatorEnable': {
          this.paginationEnable = changes[propetry].currentValue;
          break;
        }
        case 'sorting': {
          if (changes[propetry].currentValue) {
            this.dataSource.sort = this.sort;
          }
          break;
        }
          
      }
    })
  }
  menuX: number = 0
  menuY: number = 0
  getDisplayedColumns(): string[] {
    let list = this.dynamicDisplayedColumns.filter((cd) => cd.show).map((cd) => cd.name);;
    return list;

  }
  openMenu(menuType: string, event: MouseEvent) {
    this.menuX = event.clientX;
    this.menuY = event.clientY;
    switch (menuType) {
      case 'export': {
        this.exportMenuCtrl = true;
        this.menuTrigger.openMenu();
        break;
      }
      case 'hideShow': {
        this.hideShowMenuCtrl = true;
        this.openHideShowMenu(this.columnsArray);
        break;
      }
      case 'columnPin': {
        this.columnPinMenuCtrl = true;
        this.openHideShowMenu(this.columnsArray);
        break;
      }
    }
   
  }
  menuClosed() {
    this.exportMenuCtrl = false;
  }
  setColumnsData(columns:MtxGridColumn[]) {
    if (columns.length) {
      this.columnsArray = columns;
      this.setColumnsList(columns);
    }
  }
  setColumnsList(columns: MtxGridColumn[]) {
    this.columnsList = [];
    this.displayedColumns = ['select', 'edit', 'popup', 'delete'];
    let columnsArray: DisplayColumn[] = []
    columns.forEach(col => {
      if (typeof col?.header == 'string') {
        this.columnsList.push(col?.header);
        this.displayedColumns.push(col?.field);
        columnsArray.push({filter:true,name:col?.field,show:!(col.hide)});
      }
    })
    this.dynamicDisplayedColumns = columnsArray.concat(this.dynamicDisplayedColumns);
  }

  showHideColumn(name:string,value:boolean) {
    this.dynamicDisplayedColumns.filter(a => a.name == name)[0].show = value;
  }
  showSelectionColumn(name: string, value: boolean) {
    let col = this.dynamicDisplayedColumns.filter(a => a.name == name)[0];
    let index = this.dynamicDisplayedColumns.findIndex((column: any) => column.name == name);
    if (index > -1) {
      this.dynamicDisplayedColumns.splice(index, 1);
      this.dynamicDisplayedColumns.unshift(col);
      this.dynamicDisplayedColumns.filter(a => a.name == name)[0].show = value;
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    if (this.dragEnable) {
      moveItemInArray(this.dynamicDisplayedColumns, event.previousIndex + 1, event.currentIndex + 1);
      this.getDisplayedColumns();
    }

  }
  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
      //  this.selecteRow.pop();
    }
  }

  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
    //this.selecteRow.push(this.selecteRow[randomColumn]+'new');
  }
  ToggleColumnfilter(event: any) {
    console.log(this.headersFilters);
    this.toggleFilters = !this.toggleFilters;
  }


  createFilter(): (data: any, filter: string) => boolean {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      let result: boolean = true;
      if (this.globalFilter) {
        // search all text fields
        let keys = Object.keys(data);
        let expression = '';
        keys.forEach(key => {
          expression = expression + `data.${key}.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||`
        })
        if (expression.charAt(expression.length - 2) + expression.charAt(expression.length - 1) == '||') {
          expression = expression.substring(0, expression.length - 2);
        }
        result = eval(expression);
      }
      if (!result) {
        return false;
      }
      let searchString = JSON.parse(filter);
      if (this.individulFilter) {
        return data[this.individulFilter].toString().trim().toLowerCase().indexOf(searchString[this.individulFilter].toString().toLowerCase()) !== -1;
      }
      return true;
    }
    return myFilterPredicate;
  }
  applyFilter(event: any) {
    this.globalFilter = event;
    let columns: any = {};
    this.columnsArray.forEach((column: MtxGridColumn) => {
      if (column.field)
        columns[column.field] = event;
    })
    this.dataSource.filter = JSON.stringify(columns);
  }
  applysingleFilter(event:any,column:any) {
    this.individulFilter = column.field;
    this.filterValues[column.field] = event[column.field]
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }


  editEnable(row: any,i: number) {
    this.rowDataTemp['e'+i] = {...row};
    this.ELEMENT_DATA.filter((a: any) => a.id == row.id)[0]['editable'] = !this.ELEMENT_DATA.filter((a: { id: any; }) => a.id == row.id)[0]['editable'];
  }
  setCellData(row: any, i: number) {
    this.currentRow = { ...row };
    this.currentRowIndex = i;
    this.rowDataTemp['e' + i] = { ...row };
  }
  cencelInlineEditing(row: any,i:number) { 
    this.ELEMENT_DATA.filter((a: any) => a.id == row.id)[0]['editable'] = !this.ELEMENT_DATA.filter((a: { id: any; }) => a.id == row.id)[0]['editable'];
    this.rowDataTemp["e"+i] = {};
  }
  saveData(row: any, index: number) {
    this.ELEMENT_DATA.filter((a: any) => a.id == row.id)[0]['editable'] = !this.ELEMENT_DATA.filter((a: { id: any; }) => a.id == row.id)[0]['editable'];
    this.ELEMENT_DATA[index] = { ...this.rowDataTemp["e" + index] };
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    row = { ...this.rowDataTemp["e" + index] };
    this.rowDataTemp["e" + index] = {};
    let data: RowChange = {
      row: row,
      index: index
    }
    this.inlineChange.emit(data);
  }
  saveCellData() {
    this.cellEditing = {};
    let index = this.currentRowIndex;
    if (index > -1) {
      this.ELEMENT_DATA[index] = { ...this.rowDataTemp["e" + index] };
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.rowDataTemp["e" + index] = {};
      let data: RowChange = {
        row: { ...this.rowDataTemp["e" + index] },
        index: index
      }
      this.currentRowIndex = -1;
      this.cellChange.emit(data);
    }

  }
  editGridmodalChanged(event: any) {
    if (event.checked) {
      this.ELEMENT_DATA.forEach((a: { editmodal: boolean; }) => a.editmodal = true)
    }
    else {
      this.ELEMENT_DATA.forEach((a: { editmodal: boolean; }) => a.editmodal = false)
    }
  }
  multiSelectRowCheck(event: any) {
    if (event.checked) {
      this.multiSelectRow = false;
      this.displayedColumns.splice(0, 1)
      //  this.selecteRow.splice(0,1)

    }
    else {
      this.multiSelectRow = false;
      this.displayedColumns.splice(0, 1)
      //this.selecteRow.splice(0,1)
    }

    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.filterPredicate = this.createFilter();
  }
  deleteRowToggle(event: any) {
    if (event.checked) {
      this.ELEMENT_DATA.forEach((a: { deleterow: boolean; }) => a.deleterow = true)
    }
    else {
      this.ELEMENT_DATA.forEach((a: { deleterow: boolean; }) => a.deleterow = false)
    }
  }
  deleteRow(row: any) {
    let index = this.ELEMENT_DATA.findIndex((a: { id: any; }) => a.id == row.id);
    this.ELEMENT_DATA.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.rowDeleted.emit({removedRow: row,fromIndex:index});
  }

  expandRow(row: any, expand: boolean) {
    if (this.expandRows) {
      this.expandedElement = this.expandedElement === row ? null : row
    }
  }

  editPopupEnable(row: any, index?: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "70%";
    dialogConfig.maxWidth = "100%"
    var rowData = { ...row };
    dialogConfig.data = {row:rowData , columns:[...this.columnsArray]};

    this.dialog.open(PopupModalComponent, dialogConfig).afterClosed().subscribe(data => {
      let index = this.ELEMENT_DATA.indexOf(row);
      if (data && index > -1) {
        this.ELEMENT_DATA[index] = data;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        let dataChange: RowChange = {
          row: data,
          index: index
        }
        this.popupChange.emit(dataChange);
      }
    })
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /**create form control for columns */

  setToolbarMenuControls(columns: MtxGridColumn[]) {
    if (columns.length > 0 && this.showToolbar) {
      const group = this.formBuildersService.group({});
      columns.forEach((column: MtxGridColumn) => {
        const control = this.formBuildersService.control(true);
        group.addControl(column.field, control);
      })
      this.hideShowMenuGroup = group;
    }
  }

  openPinnablePropertyMenu(column: MtxGridColumn, event: MouseEvent):void{
    this.menuX = event.clientX;
    this.menuY = event.clientY;
    let options: MtxGridColumnPinOption[] = [
      { label: "Pin Left", value: "left", selected: false ,field:column.field },
      { label: "Pin Right", value: "right", selected: false, field: column.field },
      { label: "No Pin", value: null, selected: false, field: column.field },
    ]
    if (column.pinned && column.pinned !== null) {
      options.forEach((opt: MtxGridColumnPinOption) => {
        if (opt.value === column.pinned) {
          opt.selected = true;
        }
      })
    }
    else if (column.pinned == null || column.pinned == 'null') {
      options[2].selected = true;
    }
    this.columnPinningOptions = options;
    this.columnMenuTrigger.openMenu();

  }

  resetMenuChecks() {
    this.hideShowMenuCtrl = false;
    this.showHideColumnsArray = [];
    this.columnPinMenuCtrl = false;
    this.columnPinningOptions = [];
  }

  filterColumns(value:any) {
    if (value !== '') {
      this.showHideColumnsArray = this.columnsArray.filter((col: MtxGridColumn)=>{ return ((col.header!).toLowerCase()).includes((value).toLowerCase())})
    }
    else{
      this.showHideColumnsArray = this.columnsArray;

    }
  }
  returnDataType(val: any, column: MtxGridColumn) {
    if (column.options) {
      return 'selection';
    } else {
      return typeof val[column.field];
    }
  }
  openHideShowMenu(columns: MtxGridColumn[]) {
    this.showHideColumnsArray = [...columns];
    this.columnMenuTrigger.openMenu();

  }
  showHideAllColumns(val: boolean) {
    let array = [...this.dynamicDisplayedColumns];
    for (let i = 0; i < array.length; i++){

      this.showHideColumn(array[i], val);
    }
  }
  updateColumnsHideShow(values:any) {
    let keys = Object.keys(values);
    keys.forEach((key: string) => { 
      this.showHideColumn(key, values[key]);
    })
  }
  setPinnedColumns(event: MtxGridColumn[]) {
    console.log('TableCom',event)
  }
  onScroll(event: any) {
    this.scroll.emit(event);
  }
  setSelectedRows(row: any, index: number) {
    this.selection.toggle(row);
    if (this.selection.isSelected(row)) {
      this.selectionChanged.emit({ row: row, index: index, isSelected: true })
    }
    else {

      this.selectionChanged.emit({ row: row, index: index, isSelected: false })
    }
  }
  showSelectedRows() {
    this.hideRows = false;
    this.selection.clear();
    this.hiddenCtrl.clear();
  }
  hideSelectedRows() {
    if (!this.selection.isEmpty()) {
      let values = [...this.selection.selected];
      values.forEach(value => {
        if (!this.hiddenCtrl.isSelected(value)) {
          this.hiddenCtrl.toggle(value);
        }
      })
      this.selection.clear();
      this.hideRows = true;
    }
  }
  reCal() {
    if (this.paginatorEnable) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sorting) {
      this.dataSource.sort = this.sort;
    }
    if (this.columnFilter) {
      this.dataSource.filterPredicate = this.createFilter();
    }
  }
}
