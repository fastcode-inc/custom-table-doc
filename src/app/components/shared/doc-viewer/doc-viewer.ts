import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'doc-viewer',
  template: `<div class="docs-markdown" [innerHTML]="innerHtmlData"></div>`,
  styleUrls: ['./doc-viewer.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocViewer implements OnDestroy {
  innerHtmlData: string|undefined;
  constructor(
    public _elementRef: ElementRef
  ) { }

  
  @Output() contentRendered = new EventEmitter<HTMLElement>();
  /** The document text. It should not be HTML encoded. */
  @Input()
  set textContent(data: string | undefined) {
      if (data !== undefined) {
        this.innerHtmlData = data;
        this.contentRendered.emit(this._elementRef.nativeElement);

      }
  }

  ngOnDestroy() {}
}
