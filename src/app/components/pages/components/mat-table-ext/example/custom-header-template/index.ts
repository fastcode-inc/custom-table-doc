import { AppComponent as CustomHeaderTemplateComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const customHeaderTemplateExampleConfig = {
  title: 'Custom header template',
  description: `
  <p>If you just want to append something to header, you can try
  <code>[headerTemplateRef]</code> instead.</p>
  `,
  component: CustomHeaderTemplateComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/custom-header-template/app.component.html'),
      filecontent: () => loadAsset('assets/examples/custom-header-template/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/custom-header-template/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/custom-header-template/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/custom-header-template/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/custom-header-template/app.component.scss'),
    },
  ],
};

export { CustomHeaderTemplateComponent, customHeaderTemplateExampleConfig };
