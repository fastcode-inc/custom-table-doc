import { AppComponent as CustomToolbarTemplateComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const customToolbarTemplateExampleConfig = {
  title: 'Custom toolbar template',
  component: CustomToolbarTemplateComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/custom-toolbar-template/app.component.html'),
      filecontent: () => loadAsset('assets/examples/custom-toolbar-template/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/custom-toolbar-template/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/custom-toolbar-template/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/custom-toolbar-template/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/custom-toolbar-template/app.component.scss'),
    },
  ],
};

export { CustomToolbarTemplateComponent, customToolbarTemplateExampleConfig };
