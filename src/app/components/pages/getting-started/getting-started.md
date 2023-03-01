# **Getting Started with Mat Table Ext**

## **Installation**

First, you should install and set up Angular Material. [Learn more about the setup](https://material.angular.io/guide/getting-started).

Install the Extension library:

```bash
$ npm i mat-table-ext
```

## **Setup**

Import the MatTableExtModule into imports array.

```ts
import { MatTableExtModule } from 'mat-table-ext';

@NgModule({
  ...
  imports: [MatTableExtModule,...],
  ...
})
export class YourAppModule {
}
```
After adding the MatTableExtModule to your application, 
Now you have to add path of assets of table into your application.
Add following into your angular.json file under build and test(if required)
```
 {
   "assets": [
     {
       "glob": "**/*",
       "input": "./node_modules/mat-table-ext/assets",
       "output": "/assets/"
     }
   ]
 }
```
## **Theming**

After import modules, you can define a can theme for mat-table-ext. [More details about theming.](https://material.angular.io/guide/theming).


```ts
@use '../node_modules/mat-table-ext/assets/theming' as mtex;

@include mtex.mat-table-ext-theme($your-custom-theme);
```