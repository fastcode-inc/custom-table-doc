import { AppComponent as ColumnHidingPinningComponent } from './app.component';

const columnHidingPinningExampleConfig = {
  title: 'Column hiding & pinning',
  description: `<p>The <code>name</code> and <code>weight</code> column pinned left, the <code>email</code> column
  pinned right. Scroll the columns to test.</p>`,
  component: ColumnHidingPinningComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => fetch('assets/examples/column-hiding-pinning/app.component.html').then(r => r.ok ? r.text() : ''),
      filecontent: () => fetch('assets/examples/column-hiding-pinning/app.component.html').then(r => r.ok ? r.text() : ''),
    },
    {
      file: 'app.component.ts',
      content: () => fetch('assets/examples/column-hiding-pinning/app.component.ts.txt').then(r => r.ok ? r.text() : ''),
      filecontent: () => fetch('assets/examples/column-hiding-pinning/app.component.ts.txt').then(r => r.ok ? r.text() : ''),
    },
    {
      file: 'app.component.scss',
      content: () => fetch('assets/examples/column-hiding-pinning/app.component.scss').then(r => r.ok ? r.text() : ''),
      filecontent: () => fetch('assets/examples/column-hiding-pinning/app.component.scss').then(r => r.ok ? r.text() : ''),
    },
  ],
};

export { ColumnHidingPinningComponent, columnHidingPinningExampleConfig };
