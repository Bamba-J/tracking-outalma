import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RgpdCookiesPage } from './rgpd-cookies.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [RgpdCookiesPage],
  entryComponents: [
    RgpdCookiesPage
  ]
})
export class RgpdCookiesPageModule {}
