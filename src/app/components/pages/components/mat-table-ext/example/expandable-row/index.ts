import { AppComponent as ExpandableRowComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const expandableRowExampleConfig = {
  title: 'Expandable row',
  component: ExpandableRowComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/expandable-row/app.component.html'),
      filecontent: () => loadAsset('assets/examples/expandable-row/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/expandable-row/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/expandable-row/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/expandable-row/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/expandable-row/app.component.scss'),
    },
  ],
};

export { ExpandableRowComponent, expandableRowExampleConfig };
