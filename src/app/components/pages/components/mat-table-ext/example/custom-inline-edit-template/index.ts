import { AppComponent as CustomInlineEditTemplateComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const customInlineEditTemplateExampleConfig = {
  title: 'Custom Inline Editing template',
  component: CustomInlineEditTemplateComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/custom-inline-edit-template/app.component.html'),
      filecontent: () => loadAsset('assets/examples/custom-inline-edit-template/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/custom-inline-edit-template/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/custom-inline-edit-template/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/custom-inline-edit-template/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/custom-inline-edit-template/app.component.scss'),
    },
  ],
};

export { CustomInlineEditTemplateComponent, customInlineEditTemplateExampleConfig };
