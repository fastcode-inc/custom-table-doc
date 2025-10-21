import { AppComponent as GlobalSearchFilterComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const globalSearchFilterExampleConfig = {
  title: 'Global Search Filter',
  component: GlobalSearchFilterComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/global-search/app.component.html'),
      filecontent: () => loadAsset('assets/examples/global-search/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/global-search/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/global-search/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/global-search/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/global-search/app.component.scss'),
    },
  ],
};

export { GlobalSearchFilterComponent, globalSearchFilterExampleConfig };
