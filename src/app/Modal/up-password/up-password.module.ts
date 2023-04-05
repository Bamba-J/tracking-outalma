import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpPasswordPage } from './up-password.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [UpPasswordPage],
  entryComponents: [
    UpPasswordPage
  ]
})
export class UpPasswordPageModule {}
