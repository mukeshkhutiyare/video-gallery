import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallVideoPage } from './call-video.page';

const routes: Routes = [
  {
    path: '',
    component: CallVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallVideoPageRoutingModule {}
