import { AfterViewInit, Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BasicComponent, basicExampleConfig } from './example/basic';
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
import { VirtualScrollingComponent, virtualScrollingExampleConfig } from './example/virtual-scrolling';
import { CustomToolbarTemplateComponent, customToolbarTemplateExampleConfig } from './example/custom-toolbar-template';
import { CustomPopupEditTemplateComponent, customPopupEditTemplateExampleConfig } from './example/custom-popup-edit-template';
import { CustomInlineEditTemplateComponent, customInlineEditTemplateExampleConfig } from './example/custom-inline-edit-template';
import { GlobalSearchFilterComponent, globalSearchFilterExampleConfig } from './example/global-search';
import { ColumnSearchFilterComponent, columnSearchFilterExampleConfig } from './example/column-type-search';
import { StickyHeaderFooterComponent, stickyHeaderFooterExampleConfig } from './example/sticky-header-footer';
import { TableOfContents } from 'src/app/components/shared/table-of-contents/table-of-contents';
import { MatTableExtModule } from 'mat-table-ext-test1';
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/data-grid/', '_json');
}
@Component({
    selector: 'app-mat-table-ext-overview',
    templateUrl: './mat-table-ext-overview.html',
    styleUrls: ['./mat-table-ext-overview.scss'],
    standalone: false
})
export class MatTableExtOverviewComponent implements OnInit, AfterViewInit {
  @ViewChild('toc') tableOfContents!: TableOfContents;
  constructor(public route: ActivatedRoute,
    public elRef: ElementRef,
  ) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    if (this.elRef) {
      setTimeout(() => {
        this.updateTableOfContents("Overview", this.elRef.nativeElement);
      }, 0);
    }
  }
  updateTableOfContents(sectionName: string, docViewerContent: HTMLElement, sectionIndex = 0) {
    if (this.tableOfContents) {
      this.tableOfContents.addHeaders(sectionName, docViewerContent, sectionIndex);
      this.tableOfContents.updateScrollPosition();
    }
  }
}
@Component({
    selector: 'app-mat-table-ext-api',
    templateUrl: './mat-table-ext-api.html',
    standalone: false
})
export class MatTableExtApiComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
@NgModule({
  imports: [
    SharedModule,
    MatTableExtModule,
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
            virtualScrollingExampleConfig,
            rowOpExampleConfig,
            columnReorderExampleConfig,
            customCellTemplateExampleConfig,
            customCellTemplate2ExampleConfig,
            customHeaderTemplateExampleConfig,
            customToolbarTemplateExampleConfig,
            customPopupEditTemplateExampleConfig,
            customInlineEditTemplateExampleConfig,
            globalSearchFilterExampleConfig,
            columnSearchFilterExampleConfig,
            stickyHeaderFooterExampleConfig,
          ],
        },
      },
      {
        path: 'api',
        component: MatTableExtApiComponent,
        pathMatch: 'full',
        data: {
          // load markdown from assets at runtime to avoid bundler-specific loader syntax
          content: () => fetch('assets/docs/tableExt.md').then(r => r.ok ? r.text() : ''),
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
    VirtualScrollingComponent,
    TableExportComponent,
    RowOpComponent,
    columnReorderComponent,
    CustomCellTemplateComponent,
    CustomCellTemplate2Component,
    CustomHeaderTemplateComponent,
    CustomToolbarTemplateComponent,
    CustomPopupEditTemplateComponent,
    CustomInlineEditTemplateComponent,
    GlobalSearchFilterComponent,
    ColumnSearchFilterComponent,
    StickyHeaderFooterComponent,
  ],
})
export class MatTableExtExampleModule {}
