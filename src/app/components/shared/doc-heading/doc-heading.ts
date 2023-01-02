import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'doc-heading',
  template: `
    <h3 style="font-size:1.5em; font-weight:bold" [id]="id">
      <header-link [example]="text"></header-link>
      <span> {{text}}</span>
    </h3>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class DocHeadingComponent implements OnInit {
  @Input() text = '';

  id = '';

  constructor() { }

  ngOnInit() {
    this.id = this.text.toLowerCase().split(' ').filter(s => s !== '&').join('-');
  }
}
