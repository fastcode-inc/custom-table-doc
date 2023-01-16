import {Injectable} from '@angular/core';
// import {EXAMPLE_COMPONENTS} from '@angular/components-examples';

export interface AdditionalApiDoc {
  name: string;
  path: string;
}

export interface ExampleSpecs {
  prefix: string;
  exclude?: string[];
}

export interface DocItem {
  /** Id of the doc item. Used in the URL for linking to the doc. */
  id: string;
  /** Display name of the doc item. */
  name: string;
  /** Short summary of the doc item. */
  summary?: string;
  /** Package which contains the doc item. */
  packageName?: string;
  /** Specifications for which examples to be load. */
  exampleSpecs: ExampleSpecs;
  /** List of examples. */
  examples?: string[];
  /** Optional id of the API document file. */
  apiDocId?: string;
  /** Optional path to the overview file of this doc item. */
  overviewPath?: string;
  /** List of additional API docs. */
  additionalApiDocs?: AdditionalApiDoc[];
}

export interface DocSection {
  name: string;
  summary: string;
}

const exampleNames = ['basic'];
const CDK = 'cdk';
const COMPONENTS = 'components';
export const SECTIONS: { [key: string]: DocSection } = {
  [COMPONENTS]: {
    name: 'Components',
    summary: 'Angular Material offers a wide variety of UI components based on the <a' +
      ' href="https://material.io/components">Material Design specification</a>'
  },
  [CDK]: {
    name: 'CDK',
    summary: 'The Component Dev Kit (CDK) is a set of behavior primitives for building UI' +
      ' components.'
  },
};


const DOCS: { [key: string]: DocItem[] } = {
  [COMPONENTS]: [
    {
      id: 'matTableExt',
      name: 'Mat Table Ext',
      summary: 'A configurable component for displaying tabular data.',
      exampleSpecs: {
        prefix: 'matTableExt-',
      },
      additionalApiDocs: [{name: 'Testing', path: 'material-table-testing.html'}],
    }
  ],
  [CDK]: [
    {
      id: 'a11y',
      name: 'Accessibility',
      summary: 'Utilities for screen readers, focus and more.',
      exampleSpecs: {
        prefix: 'focus-monitor-',
      },
    },
    {
      id: 'accordion',
      name: 'Accordion',
      summary: 'Component with one or more expandable sections.',
      exampleSpecs: {
        prefix: 'cdk-accordion-',
      },
    },
    {
      id: 'bidi',
      name: 'Bidirectionality',
      summary: 'Utilities to respond to changes in LTR/RTL layout direction.',
      exampleSpecs: {
        prefix: 'cdk-bidi-',
      },
    },
    {
      id: 'clipboard',
      name: 'Clipboard',
      summary: 'Helpers for working with the system clipboard.',
      exampleSpecs: {
        prefix: 'cdk-clipboard-',
      },
    },
    {
      id: 'coercion',
      name: 'Coercion',
      summary: 'Utility functions for coercing @Input into specific types.',
      exampleSpecs: {
        prefix: 'cdk-coercion-',
      },
    },
    {
      id: 'collections',
      name: 'Collections',
      summary: 'Utilities for managing collections.',
      exampleSpecs: {
        prefix: 'cdk-collections-',
      },
    },
    {
      id: 'dialog',
      name: 'Dialog',
      summary: 'Directives for building accessible dialogs.',
      exampleSpecs: {
        prefix: 'cdk-dialog-',
      },
    },
    {
      id: 'drag-drop',
      name: 'Drag and Drop',
      summary: 'Directives enabling drag-and-drop interactions',
      exampleSpecs: {
        prefix: 'cdk-drag-drop-',
      },
    },
    {
      id: 'layout',
      name: 'Layout',
      summary: 'Utilities to respond to changes in viewport size.',
      exampleSpecs: {
        prefix: 'cdk-layout-',
      },
    },
    {
      id: 'listbox',
      name: 'Listbox',
      summary: 'Directives for building accessible listboxes.',
      exampleSpecs: {
        prefix: 'cdk-listbox-',
      },
    },
    {
      id: 'menu',
      name: 'Menu',
      summary: 'Directives for building accessible menus.',
      exampleSpecs: {
        prefix: 'cdk-menu-',
      },
    },
    {
      id: 'observers',
      name: 'Observers',
      summary: 'Utilities to respond to changes to element properties.',
      exampleSpecs: {
        prefix: 'cdk-observers-',
      },
    },
    {
      id: 'overlay',
      name: 'Overlay',
      summary: 'Utilities for dynamically displaying floating content.',
      exampleSpecs: {
        prefix: 'cdk-overlay-',
      },
    },
    {
      id: 'platform',
      name: 'Platform',
      summary: 'Provides information about the user\'s platform.',
      exampleSpecs: {
        prefix: 'cdk-platform-',
      },
    },
    {
      id: 'portal',
      name: 'Portal',
      summary: 'Utilities for dynamically displaying content into a target.',
      exampleSpecs: {
        prefix: 'cdk-portal-',
      },
    },
    {
      id: 'scrolling',
      name: 'Scrolling',
      summary: 'Directives for managing scroll events.',
      exampleSpecs: {
        prefix: 'cdk-virtual-scroll-',
      },
    },
    {
      id: 'stepper',
      name: 'Stepper',
      summary: 'Presents content as steps through which to progress.',
      exampleSpecs: {
        prefix: 'cdk-custom-stepper-',
      },
    },
    {
      id: 'table',
      name: 'Table',
      summary: 'A configurable component for displaying tabular data.',
      exampleSpecs: {
        prefix: 'cdk-table-',
      },
    },
    {
      id: 'test-harnesses',
      name: 'Component Harnesses',
      summary: 'Foundation for component test harnesses.',
      exampleSpecs: {
        prefix: 'cdk-test-harnesses-',
      },
      overviewPath: 'cdk/testing/test-harnesses.html',
      apiDocId: 'cdk-testing',
      additionalApiDocs: [
        {
          name: 'Testbed',
          path: 'cdk-testing-testbed.html'
        },
        {
          name: 'Protractor',
          path: 'cdk-testing-protractor.html'
        }
      ],
    },
    {
      id: 'text-field',
      name: 'Text field',
      summary: 'Utilities for working with text input fields.',
      exampleSpecs: {
        prefix: 'text-field-',
      },
    },
    {
      id: 'tree',
      name: 'Tree',
      summary: 'Presents hierarchical content as an expandable tree.',
      exampleSpecs: {
        prefix: 'cdk-tree-',
      },
    },
  ]
  // TODO(jelbourn): re-add utilities and a11y as top-level categories once we can generate
  // their API docs with dgeni. Currently our setup doesn't generate API docs for constants
  // and standalone functions (much of the utilities) and we have no way of generating API
  // docs more granularly than directory-level (within a11y) (same for viewport).
};

const ALL_COMPONENTS = processDocs('material', DOCS[COMPONENTS]);
const ALL_CDK = processDocs('cdk', DOCS[CDK]);
const ALL_DOCS = [...ALL_COMPONENTS, ...ALL_CDK];

@Injectable()
export class DocumentationItems {

  getItems(section: string): DocItem[] {
    if (section === COMPONENTS) {
      return ALL_COMPONENTS;
    }
    if (section === CDK) {
      return ALL_CDK;
    }
    return [];
  }

  getItemById(id: string, section: string): DocItem | undefined {
    const sectionLookup = section === 'cdk' ? 'cdk' : 'material';
    return ALL_DOCS.find(doc => doc.id === id && doc.packageName === sectionLookup);
  }
}

function processDocs(packageName: string, docs: DocItem[]): DocItem[] {
  for (const doc of docs) {
    doc.packageName = packageName;
    doc.examples = exampleNames.filter(key =>
      key.match(RegExp(`^${doc.exampleSpecs.prefix}`)) &&
      !doc.exampleSpecs.exclude?.some(excludeName => key.indexOf(excludeName) === 0));
  }

  return docs.sort((a, b) => a.name.localeCompare(b.name, 'en'));
}
