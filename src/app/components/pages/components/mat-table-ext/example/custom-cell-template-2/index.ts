import { AppComponent as CustomCellTemplate2Component } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const customCellTemplate2ExampleConfig = {
  title: 'Custom cell template 2',
  description: `
  <p>There has another easiest way to custom cells. You can use property
  <code>[cellTemplateRefMap]="{ mobile: mobileTpl, city: cityTpl }"</code>,
  the key of cellTemplate is the column field.</p>
  `,
  component: CustomCellTemplate2Component,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/custom-cell-template-2/app.component.html'),
      filecontent: () => loadAsset('assets/examples/custom-cell-template-2/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/custom-cell-template-2/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/custom-cell-template-2/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/custom-cell-template-2/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/custom-cell-template-2/app.component.scss'),
    },
  ],
};

export { CustomCellTemplate2Component, customCellTemplate2ExampleConfig };
