import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeBusSchedulerPage } from './welcome-bus-scheduler';

@NgModule({
  declarations: [
    WelcomeBusSchedulerPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeBusSchedulerPage),
  ],
})
export class WelcomeBusSchedulerPageModule {}
