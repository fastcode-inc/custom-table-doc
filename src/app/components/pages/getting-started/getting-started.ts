import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.html',
  styleUrls: ['./getting-started.scss']
})
export class GettingStarted implements OnInit {
  public data = {
    content: require('!!raw-loader!!highlight-loader!markdown-loader!./getting-started.md')
  }
  constructor() { }

  ngOnInit(): void {
  }
}
const routes: Routes = [{ path: '', component: GettingStarted }];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [GettingStarted],
  declarations: [GettingStarted],
})
export class gettingStartedModule { }