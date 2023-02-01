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
import { SharedModule } from './modules/shared.module';
import { RouterModule } from '@angular/router';
import { DOCS_APP_ROUTES } from './routes';
import { TableOfContentsModule } from './components/shared/table-of-contents/table-of-contents.module';
import { MatTableExtModule } from 'mat-table-ext';


@NgModule({
  declarations: [AppComponent],
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
    SharedModule,
    MatTableExtModule,
    TableOfContentsModule,
    RouterModule.forRoot(DOCS_APP_ROUTES, {}),
  ],
  exports: [MatTableExtModule, TableOfContentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
