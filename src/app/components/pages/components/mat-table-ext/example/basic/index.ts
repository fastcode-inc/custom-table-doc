
import { AppComponent as BasicComponent} from './app.component';
// appTs loaded from assets as text to avoid bundler raw import issues

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const basicExampleConfig = {
  title: 'Basic',
  component: BasicComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/basic/app.component.html'),
      filecontent: () => loadAsset('assets/examples/basic/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/basic/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/basic/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/basic/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/basic/app.component.scss'),
    },
    // {
    //   file: 'data.ts',
    //   content: require('!!highlight-loader?raw=true&lang=typescript!../../data.ts'),
    //   filecontent: require('!!raw-loader!../../data.ts'),
    // },
  ],
};

export { BasicComponent, basicExampleConfig };
