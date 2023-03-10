import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentPageTitle } from '../page-title/page-title';

@Component({
  selector: 'component-page-header',
  templateUrl: './component-page-header.html',
  styleUrls: ['./component-page-header.scss'],
})
export class ComponentPageHeader {
  constructor(public _componentPageTitle: ComponentPageTitle) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return "Mat Table Ext";
  }
}
