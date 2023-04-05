import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: 'faq',
        children: [
          {
            path: '',
            loadChildren: '../faq/faq.module#FaqPageModule'
          }
        ]
      },
      {
        path: 'message2',
        children: [
          {
            path: '',
            loadChildren: '../message2/message2.module#Message2PageModule'
          }
        ]
      },
      {
        path: 'message3',
        children: [
          {
            path: '',
            loadChildren: '../message3/message2.module#Message2PageModule'
          }
        ]
      },
      {
        path: 'suivi',
        children: [
          {
            path: '',
            loadChildren: '../suivi/suivi.module#SuiviPageModule'
          }
        ]
      },
      {
        path: 'tableau-suivi',
        children: [
          {
            path: '',
            loadChildren: '../tableau-suivi/tableau-suivi.module#TableauSuiviPageModule'
          }
        ]
      },
      {
        path: 'forms',
        children: [
          {
            path: '',
            loadChildren: '../forms/forms.module#FormsPageModule'
          }
        ]
      },
      {
        path: 'form1',
        children: [
          {
            path: '',
            loadChildren: '../form1/form1.module#Form1PageModule'
          }
        ]
      },
      {
        path: 'form2',
        children: [
          {
            path: '',
            loadChildren: '../form2/form2.module#Form2PageModule'
          }
        ]
      },
      {
        path: 'form3',
        children: [
          {
            path: '',
            loadChildren: '../form3/form3.module#Form3PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
