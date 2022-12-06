import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { merge, Observable } from 'rxjs';
import { DisplayColumn, MtxGridColumn, MtxGridColumnPinOption } from './modals';
import { CustomTableService } from './service/custom-table.service';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'mat-table-ext',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CustomTableComponent implements OnInit, OnChanges {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild('columnMenuTrigger') columnMenuTrigger!: MatMenuTrigger;
  public ELEMENT_DATA: any;
  @Input() dataSource: any;
  @Input() columns: MtxGridColumn[] = [];
  @Input() columnResizable: boolean = false;
  @Input() inlineRowEditing: boolean = false;
  @Input() popupRowEditing: boolean = false;
  @Input() enableDelete: boolean = false;
  @Input() rowSelection: boolean = false;
  @Input() multiRowSelection: boolean = false;
  @Input() stickyColumns: boolean = false;
  @Input() stickyFooter: boolean = false;
  @Input() stickyHeader: boolean = false;
  @Input() filter: boolean = false;
  @Input() selectionFilter: boolean = false;
  //toolbar inputs here
  @Input() showToolbar: boolean = false;
  @Input() toolbarTitle: string = '';
  @Input() toolbarTempate: TemplateRef<any> | undefined;
  @Input() columnHideable: boolean = true;
  @Input() columnHideableChecked: 'show' | 'hide' = 'show';
  @Input() columnPinnable: boolean = true;

  @Input() globalSearch: boolean = false;
  @Input() expandRows: boolean = false;
  @Input() dndColumns: boolean = false;
  @Input() paginatorEnable: boolean = false;

  // API inputs

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

  // API inputs Ends
  dynamicDisplayedColumns: any[] = [
    { filter: true, name: 'select', show: false },
    { filter: false, name: 'edit', show: false },
    { filter: false, name: 'popup', show: false },
    { filter: false, name: 'delete', show: false }
  ];
  public columnPinningOptions: MtxGridColumnPinOption[] = []
  headersFilters = this.dynamicDisplayedColumns.filter((x) => x.filter == true && x.show == true).map((x, i) => x.name + '_' + i);
  headersSelectFilters = this.dynamicDisplayedColumns.filter((x) => x.filter == true && x.show == true).map((x, i) => x.name + '_' + i + 1);
  
  displayedColumns: string[] = [];
  showHideColumnsArray: MtxGridColumn[] = [];
  totalSelectionList: any = [];
  columnsList: string[] = [];
  columnsArray: MtxGridColumn[] = [];
  columnsListCtrl = new FormControl([]);
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  selection = new SelectionModel<any>(true, []);
  @ViewChild('selectSearchRow') toggleselectRow: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  id_0 = new FormControl('');
  name_1 = new FormControl('');
  progress_2 = new FormControl('');
  fruit_3 = new FormControl('');

  filterValues: any = {
    id: '',
    name: '',
    progress: '',
    fruit: ''
  };
  globalFilter = '';
  showHideFilter = '';
  singleFilter = "";
  individulFilter = ""
  filtersModel = [];
  filterKeys = {};
  toggleFilters = false;
  selectToggleFilters = false;
  expandedElement: any | null;

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    public service: CustomTableService,
    public formBuildersService: FormBuilder
  ) {
    this.ELEMENT_DATA = this.dataSource

  }

  form: FormGroup = new FormGroup({
    id: new FormControl(false),
    description: new FormControl(false),
  });

  id = this.form.get('id')?.value;
  description = this.form.get('description')?.value;

  /**
   * Control column ordering and which columns are displayed.
   */
  hideShowMenuGroup!: FormGroup;
  columnPinMenuGroup!: FormGroup;
  columnDefinitions = [
    { def: 'id', label: 'ID', hide: this.id },
    { def: 'description', label: 'Description', hide: this.description },
  ];

  getDisplayedColumns(form?:string): string[] {
    let list = this.dynamicDisplayedColumns.filter((cd) => cd.show).map((cd) => cd.name);;
    return list;

  }
  ngOnChanges(changes: SimpleChanges) {
    this.setPropertyValue(changes);
  }
  ngOnInit() {
    // this.nameList = ['', ...this.ELEMENT_DATA.filter((a: { name: any; }) => a.name).map((a: { name: any; }) => a.name)];
    // this.progressList = ['', ...this.ELEMENT_DATA.filter((a: { name: any; }) => a.name).map((a: { progress: any; }) => a.progress)];
    // this.fruitList = ['', ...this.ELEMENT_DATA.filter((a: { name: any; }) => a.name).map((a: { fruit: any; }) => a.fruit)];
    // this.idList = ['', ...this.ELEMENT_DATA.filter((a: { name: any; }) => a.name).map((a: { id: any; }) => a.id)];
    // this.totalSelectionList = [this.idList, this.nameList, this.progressList, this.fruitList]
    // this.columnsList.forEach(a=> `${a}_0`  )
    //`${this.columnsList[0]}_0`
    this.id_0.valueChanges
      .subscribe(
        (id: any) => {
          this.filterValues.name = id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.name_1.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.progress_2.valueChanges
      .subscribe(
        progress => {
          this.filterValues.name = progress;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.fruit_3.valueChanges
      .subscribe(
        fruit => {
          this.filterValues.fruit = fruit;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.dataSource.filterPredicate = this.createFilter();
    
    this.hideShowMenuGroup.valueChanges.forEach(ctrlValues => {
      this.updateColumnsHideShow(ctrlValues);
    })



  }
  setPropertyValue(changes: SimpleChanges) {
    let keys = Object.keys(changes);
    keys.forEach(propetry => {
      switch (propetry) {
        case 'dataSource': {
          this.ELEMENT_DATA = changes[propetry].currentValue;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
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
          this.showHideColumn('select', changes[propetry].currentValue);
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
        case 'filter': {
          this.headersFilters = this.dynamicDisplayedColumns.filter((x) => x.filter == true && x.show == true).map((x, i) => x.name + '_' + i);
          this.toggleFilters = changes[propetry].currentValue;
          break;
        }
        case 'selectionFilter': {
          this.headersSelectFilters = this.dynamicDisplayedColumns.filter((x) => x.filter == true && x.show == true).map((x, i) => x.name + '_' + i + 1);
          this.selectToggleFilters = changes[propetry].currentValue;
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
      }
    })
  }
  menuX: number = 0
  menuY: number = 0
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
  onSelectionChange(event: any, value: any) {
    this.individulFilter = value.split('_')[0];
    if (this.individulFilter === 'name') { this.filterValues.name = event; }
    if (this.individulFilter === 'id') { this.filterValues.id = event; }
    if (this.individulFilter === 'progress') { this.filterValues.progress = event; }
    if (this.individulFilter === 'fruit') { this.filterValues.fruit = event; }
    this.dataSource.filter = JSON.stringify(this.filterValues);
    this.dataSource.filterPredicate = this.createFilter();
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

  showhidecolumn(value: any) {
    this.dynamicDisplayedColumns.filter(a => a.name == value)[0].show = !this.dynamicDisplayedColumns.filter(a => a.name == value)[0].show;
    this.getDisplayedColumns();
    this.headersFilters = this.dynamicDisplayedColumns.filter((x) => x.filter == true && x.show == true).map((x, i) => x.name + '_' + i);
    this.headersSelectFilters = this.dynamicDisplayedColumns.filter((x) => x.filter == true && x.show == true).map((x, i) => x.name + '_' + i + 1);
  }

  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
    //this.selecteRow.push(this.selecteRow[randomColumn]+'new');
  }
  ToggleColumnfilter(event: any) {
    console.log(this.headersFilters);
    this.toggleFilters = !this.toggleFilters


  }
  ToggleColumnSelectfilter(event: any) {

    this.selectToggleFilters = !this.selectToggleFilters


  }

  searchColumns() {
    this.filtersModel.forEach((each, ind) => {
      //this.filterKeys[this.columns[ind].field] = each || null;
    });
    console.log(this.headersFilters);
    //Call API with filters
  }

  clearFilters() {
    this.filtersModel = [];
    this.filterKeys = {};
    //Call API without filters
  }


  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    let o1: Observable<boolean> = this.id.valueChanges;
    let o2: Observable<boolean> = this.description.valueChanges;
    merge(o1, o2).subscribe((v) => {
      this.columnDefinitions[0].hide = this.id;
      this.columnDefinitions[1].hide = this.description;
      console.log(this.columnDefinitions);
    });

  }
  createFilter(): (data: any, filter: string) => boolean {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields

        globalMatch = data.name.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.id.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.fruit.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.progress.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1
      }

      if (!globalMatch) {
        return false;
      }


      let searchString = JSON.parse(filter);

      if (this.individulFilter == 'progress') {
        return data.progress.toString().trim().toLowerCase().indexOf(searchString.progress.toString().toLowerCase()) !== -1;
      }
      if (this.individulFilter == 'name') {
        return data.name.toString().trim().toLowerCase().indexOf(searchString.name.toString().toLowerCase()) !== -1;
      }
      if (this.individulFilter == 'fruit') {
        return data.fruit.toString().trim().toLowerCase().indexOf(searchString.fruit.toString().toLowerCase()) !== -1;
      }
      if (this.individulFilter == 'id') {
        return data.id.toString().trim().toLowerCase().indexOf(searchString.id.toString().toLowerCase()) !== -1;
      }
      return true;

    }
    return myFilterPredicate;
  }
  applyFilter(event: any) {
    this.globalFilter = event;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  applysingleFilter(event: any, value: any) {
    this.individulFilter = value.split('_')[0];
    this.filterValues[value.split('_')[0]] = event
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }


  editEnable(row: any) {
    console.log(row);
    this.ELEMENT_DATA.filter((a: { id: any; }) => a.id == row.id)[0].editable = !this.ELEMENT_DATA.filter((a: { id: any; }) => a.id == row.id)[0].editable;
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
  }
  editPopupEnable(row: any) {
    console.log(row);
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        id: row.id,
        name: row.name,
        progress: row.progress,
        fruit: row.fruit
      },
    });
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
  updatePinningValue() {

  }
  filterColumns(value:any) {
    if (value !== '') {
      this.showHideColumnsArray = this.columnsArray.filter((col: MtxGridColumn)=>{ return ((col.header!).toLowerCase()).includes((value).toLowerCase())})
    }
    else{
      this.showHideColumnsArray = this.columnsArray;

    }
  }

  openHideShowMenu(columns: MtxGridColumn[]) {
    this.showHideColumnsArray = columns;
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
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}


@Component({
  selector: 'dialog-data-example-dialog',
  template: `<h1 mat-dialog-title> Edit Row</h1>
  <div mat-dialog-content>
   
    <div>
      <div> <input class="input" type="text" value={{data.id}}></div>
      <br>
      <div> <input type="text" class="input" value={{data.name}}></div>
      <br>
      <div> <input type="text" class="input" value={{data.progress}}></div>
      <br>
      <div> <input type="text" class="input" value={{data.fruit}}></div>
      <br>
    </div>
  </div>
  `,
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
