import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearBystopsPage } from './near-bystops';

@NgModule({
  declarations: [
    NearBystopsPage,
  ],
  imports: [
    IonicPageModule.forChild(NearBystopsPage),
  ],
})
export class NearBystopsPageModule {}
