import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'  
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from './modules/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { ResizeColumnDirective } from './directives/resize-column.directive';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ColumnPinningComponent } from './components/column-pinning/column-pinning.component';
import { EditingComponent } from './components/editing/editing.component';
import { FilterColumnsComponentComponent } from './components/filter-columns-component/filter-columns-component.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { SharedModule } from './modules/shared.module';
import { RouterModule } from '@angular/router';
import { DOCS_APP_ROUTES } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    CustomTableComponent,
    ResizeColumnDirective,
    ColumnPinningComponent,
    EditingComponent,
    FilterColumnsComponentComponent,
    DocumentationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTableExporterModule,
    SharedModule,
    RouterModule.forRoot(DOCS_APP_ROUTES, {
      // scrollPositionRestoration: 'enabled',
      // anchorScrolling: 'enabled',
    }),
    SharedModule,
  ],
  exports: [ColumnPinningComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
