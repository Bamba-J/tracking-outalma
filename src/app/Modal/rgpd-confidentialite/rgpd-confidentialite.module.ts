import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RgpdConfidentialitePage } from './rgpd-confidentialite.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [RgpdConfidentialitePage],
  entryComponents: [
    RgpdConfidentialitePage
  ]
})
export class RgpdConfidentialitePageModule {}
