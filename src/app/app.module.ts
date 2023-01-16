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
import { MatTableExporterModule } from 'mat-table-exporter';
import { SharedModule } from './modules/shared.module';
import { RouterModule } from '@angular/router';
import { DOCS_APP_ROUTES } from './routes';
import { CustomTableModule } from './modules/customTable.module';
import { TableOfContentsModule } from './components/shared/table-of-contents/table-of-contents.module';

@NgModule({
  declarations: [
    AppComponent,
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
    CustomTableModule,
    TableOfContentsModule,
    RouterModule.forRoot(DOCS_APP_ROUTES, {
    }),
    SharedModule,
  ],
  exports: [
    CustomTableModule,
    TableOfContentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
