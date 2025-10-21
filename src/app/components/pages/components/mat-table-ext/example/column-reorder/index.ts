import { AppComponent as columnReorderComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const columnReorderExampleConfig = {
  title: 'Column Reorder',
  description: `<p>Pick the column from header and drop where you want to place the column.<p>`,
  component: columnReorderComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/column-reorder/app.component.html'),
      filecontent: () => loadAsset('assets/examples/column-reorder/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/column-reorder/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/column-reorder/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/column-reorder/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/column-reorder/app.component.scss'),
    },
  ],
};

export { columnReorderComponent, columnReorderExampleConfig };
