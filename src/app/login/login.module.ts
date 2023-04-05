import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { SignInPage } from '../Modal/sign-in/sign-in.page';
import { SignInPageModule } from '../Modal/sign-in/sign-in.module';
import { ContactPageModule } from '../Modal/contact/contact.module';
import { UpPasswordPageModule } from '../Modal/up-password/up-password.module';
import { UpPhonePageModule } from '../Modal/up-phone/up-phone.module';
import { HttpClientModule } from '@angular/common/http';
import { RgpdConfidentialitePageModule } from '../Modal/rgpd-confidentialite/rgpd-confidentialite.module';
import { RgpdCookiesPageModule } from '../Modal/rgpd-cookies/rgpd-cookies.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInPageModule,
    ContactPageModule,
    UpPasswordPageModule,
    UpPhonePageModule,
    RgpdConfidentialitePageModule,
    RgpdCookiesPageModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
