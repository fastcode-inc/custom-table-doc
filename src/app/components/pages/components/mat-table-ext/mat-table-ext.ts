import { Component, NgModule, OnInit } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TableBasicComponent, tableBasicExampleConfig } from './example/basic';
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/data-grid/', '_json');
}
@Component({
  selector: 'app-mat-table-ext-overview',
  templateUrl: './mat-table-ext-overview.html',
})
export class MatTableExtOverviewComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
@Component({
  selector: 'app-mat-table-ext-api',
  templateUrl: './mat-table-ext-api.html',
})
export class MatTableExtApiComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
@NgModule({
  imports: [
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule.forChild([
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: MatTableExtOverviewComponent,
        pathMatch: 'full',
        data: {
          examples: [
            tableBasicExampleConfig,
          ],
        },
      },
      {
        path: 'api',
        component: MatTableExtApiComponent,
        pathMatch: 'full',
        data: {
          content: require('!!raw-loader!!highlight-loader!markdown-loader!./tableExt.md'),
        },
      },
      { path: '**', redirectTo: 'overview' },
    ]),
  ],
  declarations: [
    MatTableExtOverviewComponent,
    MatTableExtApiComponent,
    TableBasicComponent,
    
  ],
})
export class MatTableExtModule { }
