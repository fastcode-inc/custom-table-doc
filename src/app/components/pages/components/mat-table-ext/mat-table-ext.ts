import { Component, NgModule, OnInit } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BasicComponent, basicExampleConfig } from './example/basic';
import { CustomTableModule } from 'src/app/modules/customTable.module';
import { ColumnResizeComponent, columnResizeExampleConfig } from './example/column-resize';
import { LoadingStatusComponent, loadingStatusExampleConfig } from './example/loading-status';
import { HidePaginationComponent, hidePaginationExampleConfig } from './example/hide-pagination';
import { SortableComponent, sortableExampleConfig } from './example/sortable';
import { RowSelectableComponent, rowSelectableExampleConfig } from './example/row-selectable';
import { ExpandableRowComponent, expandableRowExampleConfig } from './example/expandable-row';
import { ColumnHidingPinningComponent, columnHidingPinningExampleConfig } from './example/column-hiding-pinning';
import { HoverStripedComponent, hoverStripedExampleConfig } from './example/hover-striped';
import { TableExportComponent, exportExampleConfig } from './example/table-export';
import { RowOpComponent, rowOpExampleConfig } from './example/row-with-operations';
import { columnReorderComponent, columnReorderExampleConfig } from './example/column-reorder';
import { CustomCellTemplateComponent, customCellTemplateExampleConfig } from './example/custom-cell-template';
import { CustomCellTemplate2Component, customCellTemplate2ExampleConfig } from './example/custom-cell-template-2';
import { CustomHeaderTemplateComponent, customHeaderTemplateExampleConfig } from './example/custom-header-template';
import { VitualScrollingComponent, vitualScrollingExampleConfig } from './example/vitual-scrolling';
import { CustomToolbarTemplateComponent, customToolbarTemplateExampleConfig } from './example/custom-toolbar-template';
import { CustomPopupEditTemplateComponent, customPopupEditTemplateExampleConfig } from './example/custom-popup-edit-template';
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/data-grid/', '_json');
}
@Component({
  selector: 'app-mat-table-ext-overview',
  templateUrl: './mat-table-ext-overview.html',
})
export class MatTableExtOverviewComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
@Component({
  selector: 'app-mat-table-ext-api',
  templateUrl: './mat-table-ext-api.html',
})
export class MatTableExtApiComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
@NgModule({
  imports: [
    SharedModule,
    CustomTableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule.forChild([
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: MatTableExtOverviewComponent,
        pathMatch: 'full',
        data: {
          examples: [
            basicExampleConfig,
            columnResizeExampleConfig,
            loadingStatusExampleConfig,
            hidePaginationExampleConfig,
            sortableExampleConfig,
            rowSelectableExampleConfig,
            expandableRowExampleConfig,
            columnHidingPinningExampleConfig,
            exportExampleConfig,
            hoverStripedExampleConfig,
            vitualScrollingExampleConfig,
            rowOpExampleConfig,
            columnReorderExampleConfig,
            customCellTemplateExampleConfig,
            customCellTemplate2ExampleConfig,
            customHeaderTemplateExampleConfig,
            customToolbarTemplateExampleConfig,
            customPopupEditTemplateExampleConfig

            
          ],
        },
      },
      {
        path: 'api',
        component: MatTableExtApiComponent,
        pathMatch: 'full',
        data: {
          content: require('!!raw-loader!!highlight-loader!markdown-loader!./tableExt.md'),
        },
      },
      { path: '**', redirectTo: 'overview' },
    ]),
  ],
  declarations: [
    MatTableExtOverviewComponent,
    MatTableExtApiComponent,
    BasicComponent,
    ColumnResizeComponent,
    LoadingStatusComponent,
    HidePaginationComponent,
    SortableComponent,
    RowSelectableComponent,
    ExpandableRowComponent,
    ColumnHidingPinningComponent,
    HoverStripedComponent,
    VitualScrollingComponent,
    TableExportComponent,
    RowOpComponent,
    columnReorderComponent,
    CustomCellTemplateComponent,
    CustomCellTemplate2Component,
    CustomHeaderTemplateComponent,
    CustomToolbarTemplateComponent,
    CustomPopupEditTemplateComponent,
  ],
})
export class MatTableExtModule { }
