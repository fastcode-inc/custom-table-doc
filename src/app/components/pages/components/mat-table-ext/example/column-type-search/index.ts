import { AppComponent as ColumnSearchFilterComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const columnSearchFilterExampleConfig = {
  title: 'Column type search',
  component: ColumnSearchFilterComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/column-type-search/app.component.html'),
      filecontent: () => loadAsset('assets/examples/column-type-search/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/column-type-search/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/column-type-search/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/column-type-search.app.component.scss'),
      filecontent: () => loadAsset('assets/examples/column-type-search/app.component.scss'),
    },
  ],
};

export { ColumnSearchFilterComponent, columnSearchFilterExampleConfig };
