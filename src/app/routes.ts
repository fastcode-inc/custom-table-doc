import { Routes } from '@angular/router';

export const DOCS_APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./components/pages/homepage').then(m => m.HomepageModule),
  },
  { path: 'categories', redirectTo: '/components/categories' },
  {
    path: 'components',
    loadChildren: () =>
      import('./components/pages/component-sidenav/component-sidenav.module').then(
        m => m.ComponentSidenavModule
      ),
  },
  { path: '**', redirectTo: '' },
];
