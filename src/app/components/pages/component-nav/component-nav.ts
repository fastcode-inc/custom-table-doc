import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

export const COMPONENTS_MENU = [
  {
    id: 'matTableExt',
    name: 'Mat Table Extension',
    summary: 'The mat-table-ext is an powerful material table component to display tabular data with some extra functionality',
  }
];

@Component({
    selector: 'app-component-nav',
    templateUrl: './component-nav.html',
    styleUrls: ['./component-nav.scss'],
    animations: [
        trigger('bodyExpansion', [
            state('collapsed', style({ height: '0px', display: 'none' })),
            state('expanded', style({ height: '*', display: 'block' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
        ]),
    ],
    standalone: false
})
export class ComponentNav {
  @Input() params: Observable<Params> | undefined;
  menus = COMPONENTS_MENU;
  constructor() {}
}
