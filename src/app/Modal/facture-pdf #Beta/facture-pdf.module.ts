import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FacturePDFPage } from './facture-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: FacturePDFPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FacturePDFPage]
})
export class FacturePDFPageModule {}
