import { AppComponent as ColumnGroupingComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const ColumnGroupingExampleConfig = {
  title: 'Column Grouping',
  component: ColumnGroupingComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/column-grouping/app.component.html'),
      filecontent: () => loadAsset('assets/examples/column-grouping/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/column-grouping/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/column-grouping/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/column-grouping/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/column-grouping/app.component.scss'),
    },
    // {
    //   file: 'data.ts',
    //   content: require('!!highlight-loader?raw=true&lang=typescript!../../data.ts'),
    //   filecontent: require('!!raw-loader!../../data.ts'),
    // },
  ],
};

export { ColumnGroupingComponent, ColumnGroupingExampleConfig };
