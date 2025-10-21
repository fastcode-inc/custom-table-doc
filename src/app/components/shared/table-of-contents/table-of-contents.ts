import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  DOCUMENT
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NavigationFocusService } from '../navigation-focus/navigation-focus.service';

interface LinkSection {
  name: string;
  links: Link[];
}

interface Link {
  /* id of the section*/
  id: string;

  /* header type h3/h4 */
  type: string;

  /* If the anchor is in view of the page */
  active: boolean;

  /* name of the anchor */
  name: string;

  /* top offset px of the anchor */
  top: number;
}

@Component({
  selector: 'table-of-contents',
  styleUrls: ['./table-of-contents.scss'],
  templateUrl: './table-of-contents.html',
  standalone: false
})
export class TableOfContents implements OnInit, AfterViewInit, OnDestroy {
  @Input() container: string | undefined;

  _linkSections: LinkSection[] = [];
  _links: Link[] = [];
  _rootUrl = this._router.url.split('#')[0];

  private _scrollContainer: HTMLElement | Window | null = null;
  private _urlFragment = '';
  private subscriptions = new Subscription();

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _element: ElementRef,
    private _navigationFocusService: NavigationFocusService,
    @Inject(DOCUMENT) private _document: Document,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef) {
    console.log("..", this._router.url)

    this.subscriptions.add(this._navigationFocusService.navigationEndEvents
      .subscribe(() => {
        const rootUrl = _router.url.split('#')[0];
        this._rootUrl = rootUrl.substring(1, rootUrl.length);
        if (!_router.url.includes('#')) {
          setTimeout(() => {
            document.getElementsByTagName('component-page-header')[0].scrollIntoView();
          }, 0);
        }
      }));

    this.subscriptions.add(this._route.fragment.subscribe(fragment => {
      if (fragment != null) {
        this._urlFragment = fragment;

        const target = document.getElementById(this._urlFragment);
        if (target) {
          target.scrollIntoView();
        }
      }
    }));
  }

  ngOnInit(): void {
    // On init, the sidenav content element doesn't yet exist, so it's not possible
    // to subscribe to its scroll event until next tick (when it does exist).
    this._ngZone.runOutsideAngular(() => {
      Promise.resolve().then(() => {
        this._scrollContainer = this.container ?
          this._document.querySelector(this.container) as HTMLElement :
          window;

        if (this._scrollContainer) {
          this.subscriptions.add(fromEvent(this._scrollContainer, 'scroll').pipe(
            debounceTime(10))
            .subscribe(() => this.onScroll()));
        }
      });
    });
  }

  ngAfterViewInit() {
    this.updateScrollPosition();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateScrollPosition(): void {
    this._document.getElementById(this._urlFragment)?.scrollIntoView();
  }

  resetHeaders() {
    this._linkSections = [];
    this._links = [];
  }

  addHeaders(sectionName: string, docViewerContent: HTMLElement, sectionIndex = 0) {
    let sectionName1 = '';
    const links = Array.from(docViewerContent.querySelectorAll('h3, h4'), (header: any) => {
      // remove the 'link' icon name from the inner text
      const name = (header as HTMLElement).innerText.trim().replace(/^link/, '');
      var value = header.getBoundingClientRect();
      let id = header?.id;
      if (id == '') {
        id = (header.innerText).toLowerCase().split(' ').filter((s: any) => s !== '&').join('-');
        let anchor = document.createElement('a');
        anchor.href = '/custom-table-doc/api#' + id;
        anchor.classList.add('docs-markdown-a');
        anchor.classList.add('header-link');
        header.id = id;
        header.appendChild(anchor);
        sectionName1 = 'Api content';
      }
      return {
        name,
        type: header.tagName.toLowerCase(),
        top: value.top,
        id: id,
        active: false
      };
    });

    this._linkSections[sectionIndex] = { name: sectionName1 ? sectionName1 : sectionName, links };
    this._links.push(...links);
  }

  /** Gets the scroll offset of the scroll container */
  private getScrollOffset(): number | void {
    const { top } = this._element.nativeElement.getBoundingClientRect();
    const container = this._scrollContainer;

    if (container instanceof HTMLElement) {
      return container.scrollTop + top;
    }

    if (container) {
      return container.pageYOffset + top;
    }
  }

  private onScroll(): void {
    const scrollOffset = this.getScrollOffset();
    let hasChanged = false;

    for (let i = 0; i < this._links.length; i++) {
      // A link is considered active if the page is scrolled past the
      // anchor without also being scrolled passed the next link.
      const currentLink = this._links[i];
      const nextLink = this._links[i + 1];
      const isActive = Number(scrollOffset) >= Number(currentLink.top) &&
        (!nextLink || Number(nextLink.top) >= Number(scrollOffset));

      if (isActive !== currentLink.active) {
        currentLink.active = isActive;
        hasChanged = true;
      }
    }

    if (hasChanged) {
      // The scroll listener runs outside of the Angular zone so
      // we need to bring it back in only when something has changed.
      this._ngZone.run(() => this._changeDetectorRef.markForCheck());
    }
  }

  scrollTo(id: any) {
    this._router.navigate(['custom-table-doc/overview'], {
      fragment: id
    })
  }
}
