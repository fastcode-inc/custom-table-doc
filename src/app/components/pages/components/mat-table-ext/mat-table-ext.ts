import { AfterViewInit, Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import hljs from 'highlight.js';
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
import tableExtMd from './tableExt.generated';
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
  styleUrls: ['./mat-table-ext.scss'],
  standalone: false
})
export class MatTableExtApiComponent implements OnInit {

  renderedHtml: SafeHtml | null = null;

  constructor(public route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    // route.snapshot.data.content may be a function (that returns Promise/string) or a direct string
  const raw = await this.resolveContent(this.route.snapshot.data && this.route.snapshot.data['content']);
    if (!raw) {
      this.renderedHtml = this.sanitizer.bypassSecurityTrustHtml('<p>No documentation available.</p>');
      return;
    }

    // Configure marked to allow HTML and avoid mangling so inline HTML (like <br>) is preserved
    const mdOptions = {
      gfm: true,
      breaks: false,
      mangle: false,
      headerIds: false,
    };

    const parsed = marked.parse(raw, mdOptions);
    const html = typeof parsed === 'string' ? parsed : await parsed;

    // run highlight.js on code blocks and add helpful classes for styling
    const container = document.createElement('div');
    container.innerHTML = html;

    // Add 'api-table' class to all tables produced by markdown so our styles apply
    container.querySelectorAll('table').forEach(t => t.classList.add('api-table'));

    // Highlight code blocks inside pre > code
    container.querySelectorAll('pre code').forEach((block) => {
      const code = block.textContent || '';
      // try to detect language from class (e.g., language-ts)
      const className = Array.from(block.classList).find(c => c.startsWith('language-')) || '';
      const lang = className.replace('language-', '') || undefined;
      try {
        if (lang && hljs.getLanguage(lang)) {
          block.innerHTML = hljs.highlight(code, { language: lang }).value;
        } else {
          block.innerHTML = hljs.highlightAuto(code).value;
        }
        // Add hljs class so highlight.js theme CSS targets these nodes
        block.classList.add('hljs');
      } catch (e) {
        // fallback: leave code as-is
      }
    });

    // Mark inline code (code not inside pre) so we can style it slightly differently and
    // remove accidental surrounding backticks that may have been preserved in the text.
    container.querySelectorAll('code').forEach((c) => {
      if (c.parentElement && c.parentElement.tagName.toLowerCase() !== 'pre') {
        c.classList.add('inline');
        const txt = c.textContent || '';
        const m = txt.match(/^`(.+)`$/);
        if (m) {
          c.textContent = m[1];
        }
      }
    });

    // Convert any escaped <br> sequences (e.g. '&lt;br&gt;') produced by the markdown
    // into real line breaks so tables and code spans render as intended.
    let finalHtml = container.innerHTML.replace(/&lt;br\s*\/?>|&amp;lt;br\s*\/?>/g, '<br/>');

    this.renderedHtml = this.sanitizer.bypassSecurityTrustHtml(finalHtml);
  }

  private async resolveContent(content: any): Promise<string | null> {
    if (!content) return null;
    try {
      if (typeof content === 'function') {
        const res = content();
        if (res instanceof Promise) return await res;
        if (typeof res === 'string') return res;
        // sometimes route data provides an object with default property
        if (res && typeof res.default === 'string') return res.default;
        return null;
      }

      if (content instanceof Promise) return await content;
      if (typeof content === 'string') return content;
      if (content && typeof content.default === 'string') return content.default;
      return null;
    } catch (e) {
      return null;
    }
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
          // Prefer to use a generated module that contains the markdown at build time.
          // This avoids bundler-specific loader syntax like raw-loader/markdown-loader.
          content: () => Promise.resolve(tableExtMd),
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
