import { AppComponent as LoadingStatusComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const loadingStatusExampleConfig = {
  title: 'Loading status',
  component: LoadingStatusComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/loading-status/app.component.html'),
      filecontent: () => loadAsset('assets/examples/loading-status/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/loading-status/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/loading-status/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/loading-status/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/loading-status/app.component.scss'),
    },
  ],
};

export { LoadingStatusComponent, loadingStatusExampleConfig };
