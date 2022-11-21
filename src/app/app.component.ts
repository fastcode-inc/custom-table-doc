import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, ElementRef, Inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormControl, FormGroup } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatExpansionPanelActionRow } from '@angular/material/expansion';
import { merge, Observable } from 'rxjs';

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

const ELEMENT_DATA: any[] = [
  {id: 1, name: 'Hydrogen', progress: 1.0079, fruit: 'H' ,editable: false,editmodal:false,deleterow:false},
  {id: 2, name: 'Helium', progress: 4.0026, fruit: 'He'  ,editable: false,editmodal:false,deleterow:false},
  {id: 3, name: 'Lithium', progress: 6.941, fruit: 'Li'  ,editable: false,editmodal:false,deleterow:false},
  {id: 4, name: 'Beryllium', progress: 9.0122, fruit:'Be',editable: false,editmodal:false,deleterow:false},
  {id: 5, name: 'Boron', progress: 10.811, fruit: 'B'    ,editable: false,editmodal:false,deleterow:false},
  {id: 6, name: 'Carbon', progress: 12.0107, fruit: 'C'  ,editable: false,editmodal:false,deleterow:false},
  {id: 7, name: 'Nitrogen', progress: 14.0067, fruit: 'N',editable: false,editmodal:false,deleterow:false},
  {id: 8, name: 'Oxygen', progress: 15.9994, fruit: 'O'  ,editable: false,editmodal:false,deleterow:false},
  {id: 9, name: 'Fluorine', progress: 18.9984, fruit: 'F',editable: false,editmodal:false,deleterow:false},
  {id: 10, name: 'Neon', progress: 20.1797, fruit: 'Ne'  ,editable: false,editmodal:false,deleterow:false},
];




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AppComponent {
  
  // API inputs

  editGridmodal:any=false;
  stikcyColumn:any=false;
  stickyFooter:any=false;
  stickyHeader:any=false;
  addremoveColumns:any=false;
  toggleColumnfilter:any=false;
  multiSelectRow:any=true;
  ColumnFIlterbySelection:any=false;
  topSearchFilter:any=false;
  isExpandEnable:any=false;
  dragEnable:any=false;
  pagenationEnable:any=true;

  // API inputs Ends

  dynamicDisplayedColumns: any[] = [
     {filter:true,name:'select',show:false},
    {filter:true,name:'id',show:true}
    ,{filter:true,name:'name',show:true}
    ,{filter:true,name:'progress',show:true}
    ,{filter:true,name:'fruit',show:true}
    ,{filter:false,name:'edit',show:false},
     {filter:false,name:'popup',show:false},
     {filter:false,name:'delete',show:false}
    ];
  
  displayedColumns: string[] = ['select','id', 'name', 'progress', 'fruit','edit','popup','delete'];
  
  headersFilters = this.dynamicDisplayedColumns.filter((x) => x.filter==true && x.show == true).map((x, i) => x.name + '_' + i);

  headersSelectFilters = this.dynamicDisplayedColumns.filter((x) => x.filter==true && x.show == true).map((x, i) => x.name + '_' + i+1);
                                              //.filter((cd) => cd.show).map((cd) => cd.name);
  
  //selecteRow: string[] = ['selectselect','selectid', 'selectname', 'selectprogress', 'selectfruit','selectedit'];
  toppings = new FormControl('');
  columns = new FormControl('');
  ProgressFilter = new FormControl('');
  displayefooterColumns = ['item', 'cost'];
  nameList: string[] = [];
  progressList: string[] = [];
  fruitList: string[] = [];
  idList: string[] = [];
  totalSelectionList:any=[];
  columnsList: string[] = ['id','name' ,'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;
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

  filterValues:any = {
    id:'',
    name: '',
    progress:'',
    fruit:''
  };
  globalFilter = '';
  singleFilter="";
  individulFilter=""
  filtersModel = [];
  filterKeys = {};
  toggleFilters = false;
  SelecttoggleFilters = false;
  expandedElement: any | null;

  constructor(public dialog: MatDialog ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    
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

  columnDefinitions = [
    { def: 'id', label: 'ID', hide:  this.id },
    { def: 'description', label: 'Description', hide: this.description },
  ];
  
  getDisplayedColumns(): string[] {
    return this.dynamicDisplayedColumns.filter((cd) => cd.show).map((cd) => cd.name);
   
  }
  
  ngOnInit(){
    this.nameList = ['', ...ELEMENT_DATA.filter(a=>a.name).map(a=>a.name)];
    this.progressList=['', ...ELEMENT_DATA.filter(a=>a.name).map(a=>a.progress)];
    this.fruitList = ['', ...ELEMENT_DATA.filter(a=>a.name).map(a=>a.fruit)];
    this.idList= ['', ...ELEMENT_DATA.filter(a=>a.name).map(a=>a.id)];
    this.totalSelectionList=[this.idList,this.nameList,this.progressList,this.fruitList]
    // this.columnsList.forEach(a=> `${a}_0`  )
    //`${this.columnsList[0]}_0`
    this.id_0.valueChanges
      .subscribe(
        id => {
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



      
  }
  onSelectionChange(event: any,value:any) {
    this.individulFilter = value.split('_')[0];
    if(this.individulFilter === 'name'){ this.filterValues.name = event; }
    if(this.individulFilter === 'id'){ this.filterValues.id = event; }
    if(this.individulFilter === 'progress'){ this.filterValues.progress = event; }
    if(this.individulFilter === 'fruit'){ this.filterValues.fruit = event; }
          this.dataSource.filter = JSON.stringify(this.filterValues);
          this.dataSource.filterPredicate = this.createFilter();
  }
  drop(event: CdkDragDrop<string[]>) {
    if(this.dragEnable){
      moveItemInArray(this.dynamicDisplayedColumns, event.previousIndex+1, event.currentIndex+1);
    this.getDisplayedColumns();
    }
    
  }
  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    //  this.selecteRow.pop();
    }
  }

  showhidecolumn(value:any){
    this.dynamicDisplayedColumns.filter(a=>a.name == value)[0].show=!this.dynamicDisplayedColumns.filter(a=>a.name == value)[0].show;
    this.getDisplayedColumns();
    this.headersFilters = this.dynamicDisplayedColumns.filter((x) => x.filter==true && x.show == true).map((x, i) => x.name + '_' + i);
    this.headersSelectFilters= this.dynamicDisplayedColumns.filter((x) => x.filter==true && x.show == true).map((x, i) => x.name + '_' + i+1);
  }

  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
    //this.selecteRow.push(this.selecteRow[randomColumn]+'new');
  }
  ToggleColumnfilter(event:any){
    console.log(this.headersFilters);
    this.toggleFilters=!this.toggleFilters
    
    
  }
  ToggleColumnSelectfilter(event:any){

    this.SelecttoggleFilters=!this.SelecttoggleFilters
    
    
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
      
      if(this.individulFilter == 'progress'){
        return  data.progress.toString().trim().toLowerCase().indexOf(searchString.progress.toString().toLowerCase()) !== -1;
      }
      if(this.individulFilter == 'name'){
        return  data.name.toString().trim().toLowerCase().indexOf(searchString.name.toString().toLowerCase()) !== -1;
      }
      if(this.individulFilter == 'fruit'){
        return  data.fruit.toString().trim().toLowerCase().indexOf(searchString.fruit.toString().toLowerCase()) !== -1;
      }
      if(this.individulFilter == 'id'){
        return  data.id.toString().trim().toLowerCase().indexOf(searchString.id.toString().toLowerCase()) !== -1;
      }
      return true;
      
    }
    return myFilterPredicate;
  }
  applyFilter(event: any) {
    this.globalFilter = event;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  applysingleFilter(event: any,value:any) {
    this.individulFilter = value.split('_')[0];
    this.filterValues[value.split('_')[0]] = event
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }


  editEnable(row:any){
    console.log(row);
    ELEMENT_DATA.filter(a=>a.id==row.id)[0].editable=!ELEMENT_DATA.filter(a=>a.id==row.id)[0].editable;
  }
  editGridmodalChanged(event:any){
    if(event.checked){
      ELEMENT_DATA.forEach(a=>a.editmodal = true)
    }
    else{
      ELEMENT_DATA.forEach(a=>a.editmodal = false)
    }
  }
  multiSelectRowCheck(event:any){
    if(event.checked){
      this.multiSelectRow=false;
      this.displayedColumns.splice(0,1)
    //  this.selecteRow.splice(0,1)
      
    }
    else{
      this.multiSelectRow=false;
      this.displayedColumns.splice(0,1)
      //this.selecteRow.splice(0,1)
    }

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.filterPredicate = this.createFilter();
  }
  deleteRowToggle(event:any){
    if(event.checked){
      ELEMENT_DATA.forEach(a=>a.deleterow = true)
    }
    else{
      ELEMENT_DATA.forEach(a=>a.deleterow = false)
    }
  }
  deleteRow(row:any){
    let index=ELEMENT_DATA.findIndex(a=>a.id== row.id);
    ELEMENT_DATA.splice(index,1);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  editPopupEnable(row:any){
    console.log(row);
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        id: row.id,
        name:row.name, 
        progress:row.progress,
        fruit:row.fruit
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
  template : `<h1 mat-dialog-title> Edit Row</h1>
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}