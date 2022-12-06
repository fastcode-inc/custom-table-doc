import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'  
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from './material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalPopUpComponent } from './modal-pop-up/modal-pop-up.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { ResizeColumnDirective } from './custom-table/resize-column.directive';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ColumnPinningComponent } from './components/column-pinning/column-pinning.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalPopUpComponent,
    CustomTableComponent,
    ResizeColumnDirective,
    ColumnPinningComponent,
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
    MatTableExporterModule
  ],
  exports: [ColumnPinningComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
