import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MsgSavEmployePage } from './msg-sav-employe.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [MsgSavEmployePage],
  entryComponents: [
    MsgSavEmployePage
  ]
})
export class MsgSavEmployePageModule {}
