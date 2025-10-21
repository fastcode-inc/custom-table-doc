import { AppComponent as CustomCellTemplateComponent } from './app.component';

function loadAsset(path: string): Promise<string> {
  return fetch(path).then(r => r.ok ? r.text() : '');
}

const customCellTemplateExampleConfig = {
  title: 'Custom cell template',
  description: `
  <p>The status column are custom cells.</p>
  `,
  component: CustomCellTemplateComponent,
  files: [
    {
      file: 'app.component.html',
      content: () => loadAsset('assets/examples/custom-cell-template/app.component.html'),
      filecontent: () => loadAsset('assets/examples/custom-cell-template/app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: () => loadAsset('assets/examples/custom-cell-template/app.component.ts.txt'),
      filecontent: () => loadAsset('assets/examples/custom-cell-template/app.component.ts.txt'),
    },
    {
      file: 'app.component.scss',
      content: () => loadAsset('assets/examples/custom-cell-template/app.component.scss'),
      filecontent: () => loadAsset('assets/examples/custom-cell-template/app.component.scss'),
    },
  ],
};

export { CustomCellTemplateComponent, customCellTemplateExampleConfig };
