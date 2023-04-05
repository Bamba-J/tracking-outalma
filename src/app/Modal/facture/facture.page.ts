import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavParams } from '@ionic/angular';
import * as firebase from 'firebase';
var devis
@Component({
  selector: 'app-facture',
  templateUrl: './facture.page.html',
  styleUrls: ['./facture.page.scss'],
})
export class FacturePage implements OnInit {

  constructor(private modalCtrl: ModalController, public actionSheetController: ActionSheetController, public navPrm: NavParams) { }
 
 
// Initialisation des propriétées de la class Facture page depuis la barre de navigation à l'aide de "navPrm"
    id = this.navPrm.get('i')
    suivi = this.navPrm.get('suivi');
    Adresse_liv = this.navPrm.get('Adresse_liv');
    Adresse_exp = this.navPrm.get('Adresse_exp');
    Desc_colis = this.navPrm.get('Desc_colis');
    Site_prov = this.navPrm.get('Site_prov');
    Telephone = this.navPrm.get('Telephone');
    List_envie = this.navPrm.get('List_envie');
    Type_envoi = this.navPrm.get('Type_envoi');
    Nom = this.navPrm.get('Nom');
    inp

  ngOnInit() { }

  close() {
    this.modalCtrl.dismiss();
  }

}
