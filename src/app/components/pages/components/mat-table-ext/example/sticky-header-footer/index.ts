
import { AppComponent as StickyHeaderFooterComponent } from './app.component';
// appTs loaded from assets as text to avoid bundler raw import issues

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const stickyHeaderFooterExampleConfig = {
  title: 'Sticky Header & Footer',
  component: StickyHeaderFooterComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/sticky-header-footer/app.component.html'),
      filecontent: () => loadAsset('assets/examples/sticky-header-footer/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/sticky-header-footer/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/sticky-header-footer/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/sticky-header-footer/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/sticky-header-footer/app.component.scss'),
    },
    // {
    //   file: 'data.ts',
    //   content: require('!!highlight-loader?raw=true&lang=typescript!../../data.ts'),
    //   filecontent: require('!!raw-loader!../../data.ts'),
    // },
  ],
};

export { StickyHeaderFooterComponent, stickyHeaderFooterExampleConfig };
