import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallVideoPageRoutingModule } from './call-video-routing.module';

import { CallVideoPage } from './call-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallVideoPageRoutingModule
  ],
  declarations: [CallVideoPage]
})
export class CallVideoPageModule {}
