import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilPage } from './profil.page';
import { UpPasswordPageModule } from '../up-password/up-password.module';
import { UpPhonePageModule } from '../up-phone/up-phone.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, 
    UpPasswordPageModule,
    UpPhonePageModule,
  ],
  declarations: [ProfilPage],
  entryComponents: [
    ProfilPage
  ]
})
export class ProfilPageModule {}
