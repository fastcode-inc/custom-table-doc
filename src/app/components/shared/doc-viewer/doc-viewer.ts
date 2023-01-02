import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'doc-viewer',
  template: `<div class="docs-markdown" [innerHTML]="textContent"></div>`,
  styleUrls: ['./doc-viewer.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocViewer implements OnDestroy {
  constructor(
    public _elementRef: ElementRef
  ) { }

  
  @Output() contentRendered = new EventEmitter<HTMLElement>();
  /** The document text. It should not be HTML encoded. */
  @Input() textContent = '';

  ngOnDestroy() {}
}
