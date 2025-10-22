import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  AfterViewInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopierService } from '../copier/copier.service';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';

// Register the languages we need
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('scss', scss);

export interface ExampleType {
  title: string;
  description: string;
  component: any;
  deps?: string[];
  debug?: boolean;
  files: {
    file: string;
    content?: string;
    filecontent: { default: string };
  }[];
}

@Component({
    selector: 'example-viewer',
    templateUrl: './example-viewer.html',
    styleUrls: ['./example-viewer.scss'],
    standalone: false
})
export class ExampleViewer implements OnInit, OnDestroy, AfterViewInit {
  // Holds loaded file contents for code display
  loadedFiles: { [file: string]: string } = {};
  // Holds actual content for component execution
  loadedFileContents: { [file: string]: string } = {};
  @Input() type!: string;
  @Input() exampleData!: ExampleType;

  @ViewChild('demo', { read: ViewContainerRef, static: true }) demoRef!: ViewContainerRef;
  demoComponentRef!: ComponentRef<any>;

  /** Whether the source for the example is being displayed. */
  showSource = false;

  constructor(
    private readonly snackbar: MatSnackBar,
    private readonly copier: CopierService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}


  ngOnInit() {
    // Component creation moved to after file loading in ngAfterViewInit
  }

  private highlightCode(code: string, filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    let language = 'typescript';
    
    switch (extension) {
      case 'html':
        language = 'html';
        break;
      case 'scss':
      case 'css':
        language = 'scss';
        break;
      case 'ts':
      case 'tsx':
        language = 'typescript';
        break;
    }

    return hljs.highlight(code, { language }).value;
  }

  async ngAfterViewInit() {
    if (this.exampleData && this.exampleData.files) {
      for (const f of this.exampleData.files) {
        // Load display code
        if (typeof f.content === 'function') {
          const content = await (f.content as any)();
          const highlighted = this.highlightCode(content, f.file);
          this.loadedFiles[f.file] = highlighted;
        } else if (typeof f.content === 'string') {
          const highlighted = this.highlightCode(f.content, f.file);
          this.loadedFiles[f.file] = highlighted;
        }

        // Load actual content for execution
        if (typeof f.filecontent === 'function') {
          const fileContent = await (f.filecontent as any)();
          this.loadedFileContents[f.file] = fileContent;
        } else if (f.filecontent?.default) {
          this.loadedFileContents[f.file] = f.filecontent.default;
        }
      }

      // Recreate component after content is loaded
      if (this.demoComponentRef) {
        this.demoComponentRef.destroy();
      }
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        this.exampleData.component
      );
      this.demoComponentRef = this.demoRef.createComponent(componentFactory);
    }
  }

  ngOnDestroy() {
    if (this.demoComponentRef) {
      this.demoComponentRef.destroy();
    }
  }

  toggleSourceView() {
    this.showSource = !this.showSource;
  }

  copySource(content: any) {
    if (this.copier.copyText(content.innerText)) {
      this.snackbar.open('Code copied', '', { duration: 2500 });
    } else {
      this.snackbar.open('Copy failed. Please try again!', '', { duration: 2500 });
    }
  }
}
