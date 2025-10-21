import { AppComponent as HidePaginationComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const hidePaginationExampleConfig = {
  title: 'Hide pagination',
  description: ``,
  component: HidePaginationComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/hide-pagination/app.component.html'),
      filecontent: () => loadAsset('assets/examples/hide-pagination/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/hide-pagination/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/hide-pagination/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/hide-pagination/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/hide-pagination/app.component.scss'),
    },
  ],
};

export { HidePaginationComponent, hidePaginationExampleConfig };
