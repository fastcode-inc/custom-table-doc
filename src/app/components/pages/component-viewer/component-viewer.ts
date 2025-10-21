import { AfterViewInit, ChangeDetectorRef, Component, Directive, ElementRef, NgZone, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Scroll } from '@angular/router';
import { Observable, Subject, map, skip, takeUntil } from 'rxjs';
import { ComponentPageTitle } from '../page-title/page-title';
import { TableOfContents } from '../../shared/table-of-contents/table-of-contents';
import { DocViewer } from '../../shared/doc-viewer/doc-viewer';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
    selector: 'app-component-viewer',
    templateUrl: './component-viewer.html',
    styleUrls: ['./component-viewer.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ComponentViewer implements AfterViewInit , OnDestroy {
  @ViewChild('toc') tableOfContents!: TableOfContents;
  sections: Set<string> = new Set(['Overview', 'Api']);
  private _destroyed = new Subject<void>();

  componentId = 'matTableExt';

  constructor(
    _route: ActivatedRoute,
    private router: Router,
    public _componentPageTitle: ComponentPageTitle,
    public elRef: ElementRef,
  ) {
    const routeAndParentParams = [_route.params];
    if (_route.parent) {
      routeAndParentParams.push(_route.parent.params);
    }

    // TODO: NavigationEnd not working if reload page
    // this.router.events.subscribe(s => {
    //   if (s instanceof NavigationEnd) {
    //     this.componentId = s.url.split('/')[2];
    //     this._componentPageTitle.title = this.componentId;
    //   } else if (s instanceof Scroll) {
    //     this.componentId = s.routerEvent.url.split('/')[2];
    //     if (this.componentId) {
    //       this._componentPageTitle.title = this.componentId;
    //     }
    //   }
    // });
  }
  ngAfterViewInit() {
    if (this.elRef) {
      setTimeout(() => {
        this.updateTableOfContents("Overview content", this.elRef.nativeElement);
      }, 0);
    }
  }
  onTabChanged(event:any) {
    console.log("onTableChanged", event);
    if (this.elRef) {
      setTimeout(() => {
        this.updateTableOfContents(event+" content", this.elRef.nativeElement);
      }, 0);
    }
  }
  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
  updateTableOfContents(sectionName: string, docViewerContent: HTMLElement, sectionIndex = 0) {
    if (this.tableOfContents) {
      this.tableOfContents.addHeaders(sectionName, docViewerContent, sectionIndex);
      this.tableOfContents.updateScrollPosition();
    }
  }
}

/**
 * Base component class for views displaying docs on a particular component (overview, API,
 * examples). Responsible for resetting the focus target on doc item changes and resetting
 * the table of contents headers.
 */
@Directive()
export class ComponentBaseView implements OnInit, OnDestroy {
  @ViewChild('toc') tableOfContents!: TableOfContents;
  @ViewChildren(DocViewer) viewers!: QueryList<DocViewer>;

  showToc: Observable<boolean>;
  private _destroyed = new Subject();

  constructor(
    public componentViewer: ComponentViewer,
    breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef) {
    this.showToc = breakpointObserver.observe('(max-width: 1200px)')
      .pipe(
        map((result:any) => {
          this.changeDetectorRef.detectChanges();
          return !result.matches;
        })
      );
  }

  ngOnInit() {
    this.showToc.pipe(
      skip(1),
      takeUntil(this._destroyed)
    ).subscribe(() => {
      if (this.tableOfContents) {
        this.viewers.forEach(viewer => {
          viewer.contentRendered.emit(viewer._elementRef.nativeElement);
        });
      }
    });
  }

  ngOnDestroy() {
    this._destroyed.next(0);
    this._destroyed.complete();
  }

  updateTableOfContents(sectionName: string, docViewerContent: HTMLElement, sectionIndex = 0) {
    if (this.tableOfContents) {
      this.tableOfContents.addHeaders(sectionName, docViewerContent, sectionIndex);
      this.tableOfContents.updateScrollPosition();
    }
  }
}