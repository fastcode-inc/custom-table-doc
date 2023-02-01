import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';

import { ComponentViewer } from '../component-viewer/component-viewer';
import { MatTableExtModule } from 'mat-table-ext';

const routes = [
  {
    path: '',
    component: ComponentViewer,
    children: [
      {
        path: '',
        loadChildren: () => import('./mat-table-ext/mat-table-ext').then(m => m.MatTableExtExampleModule),
      },
    ],
  },
];

@NgModule({
  imports: [SharedModule, MatTableExtModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [MatTableExtModule],
})
export class ComponentsModule {}
