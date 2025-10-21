import { AppComponent as ColumnResizeComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const columnResizeExampleConfig = {
  title: 'Column resize',
  description: '<p>Turn the checkbox on to test the Column Resizing</p>',
  component: ColumnResizeComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/column-resize/app.component.html'),
      filecontent: () => loadAsset('assets/examples/column-resize/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/column-resize/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/column-resize/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/column-resize/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/column-resize/app.component.scss'),
    },
  ],
};

export { ColumnResizeComponent, columnResizeExampleConfig };
