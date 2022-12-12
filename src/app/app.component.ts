
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import EXAMPLE_DATA  from 'src/assets/data.json';
import { MtxGridColumn, RowSelectionChange } from './custom-table/models';
import { MatIconRegistry } from '@angular/material/icon';
import { CustomTableService } from './custom-table/service/custom-table.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;
  public dataSource:any;
  stickyColumn: any = false;
  columnResizable: any = false;
  stickyFooter: any = false;
  stickyHeader: any = false;
  inlineRowEditing: any = true;
  popupRowEditing: any = true;
  deleteRow: any = false;
  stripedRows: any = false;
  rowSelection: any = false;
  multiRowSelection: any = false;
  simpleFilter: any = false;
  selectionFilter: any = false;
  columnFilterBySelection: any = true;

  public columns: MtxGridColumn[] = [
    { header: 'ID', field: 'id' ,type:'number',maxWidth:'50px'},
    { header: 'Name', field: 'name', type: 'string', width: '70px' },
    { header: 'Age', field: 'age', type: 'string' , width: '90px' },
    { header: 'Address', field: 'address', type: 'string', width: '110px' },
]
//   public columns: MtxGridColumn[] = [
//     { header: 'ID', field: 'id' , width:'250px'},
//     { header: 'Name', field: 'name', width: '250px'},
//     { header: 'Weight', field: 'weight', width: '250px'},
//     { header: 'Symbol', field: 'symbol', width: '250px', options:['A','B','C','D','E','F']},
// ]

// public columns: MtxGridColumn[] = [
//     { header: '', field: 'position',  },
//     { header: 'Name', field: 'name',  },
//     { header: 'tags', field: 'tag.0.value', },
//     { header: 'Weight', field: 'weight',  },
//     { header: 'Symbol', field: 'symbol',  },
//     { header: 'Gender', field: 'gender',  },
//     { header: 'Mobile', field: 'mobile',  },
//     { header: 'Tele', field: 'tele',  },
//     { header: 'City', field: 'city',  },
//     { header: 'Address', field: 'address',  },
//     { header: 'Date', field: 'date',  },
//     { header: 'Website', field: 'website',  },
//     { header: 'Company', field: 'company',  },
//     { header: 'Email', field: 'email',  },
//     { header: 'Status', field: 'status', type: 'boolean',  },
//   ];
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
    public service: CustomTableService,
    
  ) {
    this.loadPage(10);
    this.addIconsToRegistery();
   }
  
  ngOnInit(): void {
   }
  addIconsToRegistery() {
    let iconNames = ['pinLeft', 'pinRight', 'pinNone', 'pinned','pinIcon'];
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
  showData(event:any, propetry:string) {
    console.log(propetry, event);
  }
  onScroll(event: any) {
    let pageLimit: number = 10;
    let scrollHeight = event.target.scrollHeight;
    let scrollTop = event.target.scrollTop;
    let clientHeight = event.target.clientHeight;
    let scrollPosition = scrollHeight - (scrollTop + clientHeight);
    console.log('scrollPosition', scrollPosition);
    if (scrollPosition <= 5) {
      this.loadPage(pageLimit);
    }
  }
  loadPage(limit: number) {
    this.isLoading = true;
    let offset = this.dataSource ? this.dataSource.data.length : 0;
    this.service.getResults(offset, limit).subscribe(results => {
      if (this.dataSource) {
        const rows = [...this.dataSource.data, ...results.data];
        this.dataSource = new MatTableDataSource(rows);
      }
      else {
        const rows = [...results.data];
        this.dataSource = new MatTableDataSource(rows);
      }
      this.isLoading = false;
    });
  }
  onSelectionChange(event: RowSelectionChange) { 
    console.log("Selection Change: ", event)
  }
}

