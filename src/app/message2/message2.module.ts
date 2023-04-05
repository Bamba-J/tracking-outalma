import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Message2Page } from './message2.page';
import { MsgSavEmployePageModule } from '../Modal/msg-sav-employe/msg-sav-employe.module';

const routes: Routes = [
  {
    path: '',
    component: Message2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MsgSavEmployePageModule
  ],
  declarations: [Message2Page]
})
export class Message2PageModule {}
