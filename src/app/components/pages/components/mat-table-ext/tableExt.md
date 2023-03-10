
# Mat Table Ext

### Directives

#### `MatTableExt`

Selector: `[mat-table-ext]`

Exported as: `MatTableExt`

##### **Properties**

###### **Basic**

| Name | Description |
| :--- | :--- |
| `@Input()`<br>`columns: MTExColumn[]` | The table's columns. |
| `@Input()`<br>`dataSource: MatTableDataSource[]` | The table's data. |
| `@Input()`<br>`loadingIdicator: boolean` | Whether the table's data is loading. Default is **`false`**. |

###### **Page**

| Name | Description |
| :--- | :--- |
| `@Input()`<br>`showPaginator: boolean` | Whether to show the paginator. Default is **`true`**. |
| `@Input()`<br>`showFirstLastButtons: boolean` | Whether to show the first/last buttons UI to the user. Default is **`true`**. |
| `@Input()`<br>`pageSizeOptions: number[]` | The set of provided page size options to display to the user. Default is **`[10, 50, 100]`** |
| `@Output()`<br>`scroll : EventEmitter<any>` | The set of provided page size options to display to the user|

###### **Sort**

| Name | Description |
| :--- | :--- |
| `@Input()`<br>`sorting: boolean` | Sorting for table columns. Default is **`false`**. |

###### **Expansion**

| Name | Description |
| :--- | :--- |
| `@Input()`<br>`expandRows: boolean` | Whether the row is expandable. Default is **`false`**. |
| `@Input()`<br>`expansionTemplateRef: TemplateRef<any>` | The template for the expandable row. |
| `@Output()`<br>`expansionChange: EventEmitter<any>` | Event emitted when the user toggles the expandable row. |

###### **Selection**

| Name | Description |
| :--- | :--- |
| `@Input()`<br>`multiSelectable: boolean` | Whether to support multiple row selection. Default is **`true`**. |
| `@Input()`<br>`rowSelection: boolean` | Whether the row is selectable. Default is **`false`**. |
| `@Output()`<br>`selectionChanged: EventEmitter<any>` | Event emitted when the row is selected. |

###### **Toolbar**

| Name | Description |
| :--- | :--- |
| `@Input()`<br>`showToolbar: boolean` | Whether to show the toolbar. Default is **`false`**. |
| `@Input()`<br>`toolbarTitle: string` | The text of the toolbar's title. Default is **`''`**. |
| `@Input()`<br>`toolbarTemplate: TemplateRef<any>` | The template for the toolbar . |

###### **Column**

| Name | Description |
| :--- | :--- |
| `@Input()`<br>`columnHideable: boolean` | Whether the column is hideable. Default is **`false`**. |
| `@Input()`<br>`columnPinnable: boolean` | Whether the column is pinnable. Default is **`false`**. |

###### **Row**

| Name | Description |
| :--- | :--- |
| `@Input()`<br>`rowHover: boolean` | Whether to use the row hover style. Default is **`false`**. |
| `@Input()`<br>`stripedRows: boolean` | Whether to use the row striped style. Default is **`false`**. |

###### **Cell templates**

| Name | Description |
| :--- | :--- |
| `@Input()`<br>`headerTemplateRef: TemplateRef<any>` | The header's cell template for the table. |
| `@Input()`<br>`cellTemplateRef: TemplateRef<any>` | The cell template for the table. |
| `@Input()`<br>`cellTemplateRefMap: TemplateRef<any>` | The cell template for the table when you want template for more columns. |

### **Interfaces**

#### `MTExColumn`

```ts
interface MTExColumn {
  field: string;
  header?: string ;
  disabled?: boolean;
  width?: string;
  minWidth?: number;
  maxWidth?: number;
  type: MTExColumnType;
  options?: string[] ;
  header?: string ;
  name?: string;
  footerText?: string;
  headerTooltip?: string;
  cellTooltip?: string;
}
```

### Type aliases

#### `MTExColumnType`

```ts
type MTExColumnType = 'selection' | 'string' | 'boolean' | 'number'  | 'date';;
```
