import { AppComponent as RowSelectableComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const rowSelectableExampleConfig = {
  title: 'Row selectable',
  description: `<p>Use <code>button controls</code> from toolbar to show or hide rows.</p>`,
  component: RowSelectableComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/row-selectable/app.component.html'),
      filecontent: () => loadAsset('assets/examples/row-selectable/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/row-selectable/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/row-selectable/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/row-selectable/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/row-selectable/app.component.scss'),
    },
  ],
};

export { RowSelectableComponent, rowSelectableExampleConfig };
