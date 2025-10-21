import { AppComponent as HoverStripedComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const hoverStripedExampleConfig = {
  title: 'Hover & Striped',
  component: HoverStripedComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/hover-striped/app.component.html'),
      filecontent: () => loadAsset('assets/examples/hover-striped/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/hover-striped/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/hover-striped/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/hover-striped/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/hover-striped/app.component.scss'),
    },
  ],
};

export { HoverStripedComponent, hoverStripedExampleConfig };
