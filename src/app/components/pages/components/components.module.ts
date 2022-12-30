import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';

import { ComponentViewer } from '../component-viewer/component-viewer';

const routes = [
  {
    path: '',
    component: ComponentViewer,
    children: [
      {
        path: 'matTableExt',
        loadChildren: () => import('./mat-table-ext/mat-table-ext').then(m => m.MatTableExtModule),
      },
    ],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [],
})
export class ComponentsModule {}
