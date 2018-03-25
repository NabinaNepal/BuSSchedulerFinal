import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuSchedulerPage } from './menu-scheduler';

@NgModule({
  declarations: [
    MenuSchedulerPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuSchedulerPage),
  ],
})
export class MenuSchedulerPageModule {}
