import { AppComponent as VirtualScrollingComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const virtualScrollingExampleConfig = {
  title: 'Virtual Scrolling',
  component: VirtualScrollingComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/virtual-scrolling/app.component.html'),
      filecontent: () => loadAsset('assets/examples/virtual-scrolling/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/virtual-scrolling/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/virtual-scrolling/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/virtual-scrolling/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/virtual-scrolling/app.component.scss'),
    },
    // {
    //   file: 'data.ts',
    //   content: require('!!highlight-loader?raw=true&lang=typescript!../../data.ts'),
    //   filecontent: require('!!raw-loader!../../data.ts'),
    // },
  ],
};

export { VirtualScrollingComponent, virtualScrollingExampleConfig };
