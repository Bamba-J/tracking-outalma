import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from '@ionic/angular';

import { SatisfactionFormPage } from './satisfaction-form.page';

const routes: Routes = [
  {
    path: '',
    component: SatisfactionFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SatisfactionFormPage],
  bootstrap: [SatisfactionFormPage],
})
export class SatisfactionFormPageModule {}
