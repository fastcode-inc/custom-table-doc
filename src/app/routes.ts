import { Routes } from '@angular/router';

export const DOCS_APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/pages/component-sidenav/component-sidenav.module').then(
        m => m.ComponentSidenavModule
      ),
  },
  { path: '**', redirectTo: '' },
];
