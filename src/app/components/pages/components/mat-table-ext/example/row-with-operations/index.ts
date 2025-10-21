
import { AppComponent as RowOpComponent } from './app.component';
// appTs loaded from assets as text to avoid bundler raw import issues

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const rowOpExampleConfig = {
  title: 'Row with Operations',
  component: RowOpComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/row-with-operations/app.component.html'),
      filecontent: () => loadAsset('assets/examples/row-with-operations/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/row-with-operations/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/row-with-operations/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/row-with-operations/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/row-with-operations/app.component.scss'),
    },
  ],
};

export { RowOpComponent, rowOpExampleConfig };
