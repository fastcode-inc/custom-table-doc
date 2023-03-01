import { Routes } from '@angular/router';

export const DOCS_APP_ROUTES: Routes = [
  {
    path: 'getting-started',
    loadChildren: () =>
      import('./components/pages/getting-started/getting-started').then(
        m => m.gettingStartedModule
      ),
  },
  {
    path: 'mat-table-ext',
    loadChildren: () =>
      import('./components/pages/component-sidenav/component-sidenav.module').then(
        m => m.ComponentSidenavModule
      ),
  },
  { path: '**', redirectTo: 'getting-started' },
];
