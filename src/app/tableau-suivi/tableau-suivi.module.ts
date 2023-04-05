import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';

import { TableauSuiviPage } from './tableau-suivi.page';
import { MessagePageModule } from '../Modal/message/message.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FacturePageModule } from '../Modal/facture/facture.module';
import { DevisPageModule } from '../Modal/devis/devis.module';
// import {bootstrap} from "bootstrap";



const routes: Routes = [
  {
    path: '',
    component: TableauSuiviPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
    IonicModule,
    NgbModule,
    RouterModule.forChild(routes),
    MessagePageModule,
    FacturePageModule,
    DevisPageModule,
    HttpClientModule
    
  ],
  declarations: [TableauSuiviPage],
  bootstrap: [TableauSuiviPage]
})
export class TableauSuiviPageModule {}
