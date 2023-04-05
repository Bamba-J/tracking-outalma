import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavParams } from '@ionic/angular';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

// Initialisation des variables global
var i = 2


@Component({
  selector: 'app-devis',
  templateUrl: './devis.page.html',
  styleUrls: ['./devis.page.scss'],
})
export class DevisPage implements OnInit {

  constructor(private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public navPrm: NavParams,
    private HttpCLient: HttpClient,
  ){console.log(this.List_envie);}

// Initialisation des propriété de la class DevisPage
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
  idInpunt = 2
  inp = []

//Création automatique des inputs lors du clique
  CreateInp() {
    i++
    var Input = document.createElement("input");
    var Input2 = document.createElement("input");
    Input.type = "text";
    var container = document.getElementById('contains1');
    Input.placeholder = "Libellé " + this.idInpunt
    Input2.placeholder = "Prix " + this.idInpunt
    Input.id = 'input' + i;
    container.appendChild(Input);//Création d'un input de type "Libellé"
    i++
    this.idInpunt++
    Input2.id = 'input' + i
    container.appendChild(document.createTextNode("\u00a0"));//Création d'un espace
    container.appendChild(document.createTextNode("\u00a0"));//Création d'un espace
    container.appendChild(Input2); //Création d'un input de type "Prix"
    container.appendChild(document.createElement("br"));//Création d'un saut de ligne
    container.appendChild(document.createElement("br"));//Création d'un saut de ligne
  }

  
//On regarde si l'input n'est pas vide
//On crée une liste de Libellé et de prix
//On enregistre la liste dans la base de données
  GetValInpu() {
    var a = 0
    var b = 0

    while (a != i) {
      a++
      b++
      b++
      if ((<HTMLInputElement>document.getElementById('input' + a)).value != "" && (<HTMLInputElement>document.getElementById('input' + b)).value != "") {
        this.inp.push({
          Libellé: ((<HTMLInputElement>document.getElementById('input' + a)).value),
          Prix: ((<HTMLInputElement>document.getElementById('input' + b)).value)
        })
      }
      a++
    }
    this.Enregistrer()

  }

//On enregistre l'etat de la demande dans la base de données 
//On notifi le client
  writeSuiviData() {
    var Message = "Veuillez valider le devis qui est disponible dans votre espace client."
    this.HttpCLient.get("https://api.allmysms.com/http/9.0/?login=pdieye&apiKey=567cae5f68e5385&message=" + Message + "&mobile=" + this.Telephone + "&tpoa=OUTALMA").subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
    console.log('message envoyé')
    firebase.database().ref('suivi_details/' + this.id + '/Etat').set('En attente de validation du devis').then(
      (snapshot) => {
        console.log('ok');

      },
      (error) => {
        console.log(error);
      }
    );;
    firebase.database().ref('suivi_details/' + this.id + '/Priorite').set('rouge').then(
      (snapshot) => {
        console.log('ok');

      },
      (error) => {
        console.log(error);
      }
    );;
  }

  //Enregistrement du devis dans la base de données et ouverture du PDF
  Enregistrer() {
    firebase.database().ref('devis/' + this.id).set(this.inp).then(
      (snapshot) => {
        console.log('data :', this.inp);
        var u = 0
        var inpu
        inpu = this.inp.length
        console.info(inpu)
        var input
        while (inpu != u) {
          input += "&lib" + u + "=" + this.inp[u]['Libellé'] + "&pri" + u + "=" + this.inp[u]['Prix']
          u++
        }

        window.open("https://tracking.outalma.com/facture/?a=" + this.Nom + '&id=' + this.id + '&y=2' + input + '', '_system', 'location=yes')
        this.writeSuiviData()
        this.modalCtrl.dismiss();

      },
      (error) => {
        console.log(error, this.inp);
      }
    );
  }

  ngOnInit() {
    i = 2
  }
  
  close() {
    this.modalCtrl.dismiss();
  }

}
