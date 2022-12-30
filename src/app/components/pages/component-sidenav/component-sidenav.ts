import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material/sidenav';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationFocusService } from '../../shared/navigation-focus/navigation-focus.service';

const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 959;

@Component({
  selector: 'app-component-sidenav',
  templateUrl: 'component-sidenav.html',
  styleUrls: ['component-sidenav.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComponentSidenav implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  params: Observable<Params> | undefined;
  isExtraScreenSmall: Observable<boolean>;
  isScreenSmall: Observable<boolean>;
  private subscriptions = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _navigationFocusService: NavigationFocusService,
    breakpoints: BreakpointObserver
  ) {
    this.isExtraScreenSmall = breakpoints
      .observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
    this.isScreenSmall = breakpoints
      .observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
  }

  ngOnInit() {
    // Combine params from all of the path into a single object.
    this.params = combineLatest(
      this._route.pathFromRoot.map(route => route.params),
      Object.assign
    );

    this.subscriptions.add(
      this._navigationFocusService.navigationEndEvents
        .pipe(map(() => this.isScreenSmall))
        .subscribe(shouldCloseSideNav => {
          if (shouldCloseSideNav && this.sidenav) {
            this.sidenav.close();
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleSidenav(sidenav: MatSidenav): Promise<MatDrawerToggleResult> {
    return sidenav.toggle();
  }
}
