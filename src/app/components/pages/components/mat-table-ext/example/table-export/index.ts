
import { AppComponent as TableExportComponent } from './app.component';
// appTs loaded from assets as text to avoid bundler raw import issues

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const exportExampleConfig = {
  title: 'Table export',
  description: ` Expanded rows can also be exported when enabled`,
  component: TableExportComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/table-export/app.component.html'),
      filecontent: () => loadAsset('assets/examples/table-export/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/table-export/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/table-export/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/table-export/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/table-export/app.component.scss'),
    },
  ],
};

export { TableExportComponent, exportExampleConfig };
