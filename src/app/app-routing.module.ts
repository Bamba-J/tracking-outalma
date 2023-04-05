import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'satisfaction-form', loadChildren: './Modal/satisfaction-form/satisfaction-form.module#SatisfactionFormPageModule' },
  { path: 'tableau-suivi', loadChildren: './tableau-suivi/tableau-suivi.module#TableauSuiviPageModule' },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'form2',
    loadChildren: './form2/form2.module#Form2PageModule'
  },
  {
    path: 'form1',
    loadChildren: './form1/form1.module#Form1PageModule'
  },
  {
    path: 'form3',
    loadChildren: './form3/form3.module#Form3PageModule'
  },
  {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsPageModule'
  },
  // { path: 'rgpd-cookies', loadChildren: './Modal/rgpd-cookies/rgpd-cookies.module#RgpdCookiesPageModule' },
  // { path: 'rgpd-confidentialite', loadChildren: './Modal/rgpd-confidentialite/rgpd-confidentialite.module#RgpdConfidentialitePageModule' },
  // { path: 'msg-sav-employe', loadChildren: './Modal/msg-sav-employe/msg-sav-employe.module#MsgSavEmployePageModule' },
  // { path: 'devis', loadChildren: './devis/devis.module#DevisPageModule' },
  // { path: 'facture', loadChildren: './facture/facture.module#FacturePageModule' },
  // { path: 'log-verif', loadChildren: './log-verif/log-verif.module#LogVerifPageModule' },
  // { path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInPageModule' },
  // { path: 'up-phone', loadChildren: './up-phone/up-phone.module#UpPhonePageModule' },
  // { path: 'up-password', loadChildren: './up-password/up-password.module#UpPasswordPageModule' },
  // { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  // { path: 'tableau-suivi-demande', loadChildren: './tableau-suivi-demande/tableau-suivi-demande.module#TableauSuiviDemandePageModule' },
  // { path: 'suivi-demande', loadChildren: './suivi-demande/suivi-demande.module#SuiviDemandePageModule' },
  // { path: 'message', loadChildren: './message/message.module#MessagePageModule' },
  // { path: 'message2', loadChildren: './message2/message2.module#Message2PageModule' },
  // { path: 'suivi', loadChildren: './suivi/suivi.module#SuiviPageModule' },
  // { path: 'profil', loadChildren: './Modal/profil/profil.module#ProfilPageModule' },
  // { path: 'faq', loadChildren: './faq/faq.module#FaqPageModule' },
  // { path: 'profil-client', loadChildren: './profil-client/profil-client.module#ProfilClientPageModule' },
  // { path: 'profil', loadChildren: './profil/profil.module#ProfilPageModule' },
  /*{ path: 'tab1',
     loadChildren: './tab1/tab1.module#tab1PageModule'
   },
   {
     path: 'tab2',
     loadChildren: './tab2/tab2.module#tab2PageModule'
   },
   {
     path: 'tab3',
     loadChildren: './tab3/tab3.module#tab3PageModule'
  },*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
