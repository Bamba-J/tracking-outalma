import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SuiviPage } from './suivi.page';
import { MessagePageModule } from '../Modal/message/message.module';

const routes: Routes = [
  {
    path: '',
    component: SuiviPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MessagePageModule
  ],
  declarations: [SuiviPage]
})
export class SuiviPageModule {}
