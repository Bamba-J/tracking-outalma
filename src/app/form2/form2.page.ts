import { Component, OnInit, } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController, NavController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-form2',
  templateUrl: './form2.page.html',
  styleUrls: ['./form2.page.scss'],
})

export class Form2Page implements OnInit{
  VigiK="";
  Prenom2:"Prenom2";
  Nom2:"Nom2";
  Telephone2:"Telephone2";
  Liens2:"Liens2";
  Ad_rue2:"Ad_rue2";
  Ad_postal2:"Ad_postal2";
  Ad_pays2:"Ad_pays2";
  Type_envoi:"Type_envoi"
  
  TabDemandes = [];
  TabUser2 = [];
  TabFields = [
    {
      Ad_pay_l:'',
      Ad_rue_l:'',
      Ad_pos_l:'',
      Ad_pay_e:'',
      Ad_rue_e:'',
      Ad_pos_e:'',
      Nom: '',
      Atype:'Demande',
      Date_crea:0,
      Date_livraison:'',
      Desc_colis:'',
      Etat:'En attente',
      Liste_envies:'',
      Num_colis:'',
      Num_com:'',
      Prenom: '',
      Site_prov:'',
      Type_demande:'2',
      Type_envoi:'',
      Telephone:'',
      i:'123456',
      icon:'paper',
      id:'123456',
      Priorite:'gris',
      UID:'',
    }
  ];

  ngOnInit() {
  } 
  goback(){
    this.nav.navigateBack('/forms');
  }

  constructor(public toastCtrl: ToastController, private nav : NavController){
    var VigiK = "";
    firebase.database().ref('/Cry/').on("value", function(snapshot) {
      var tag = snapshot.val();
      VigiK = tag[0]['Vigi'];},
    function (error) {
      console.log("Error : " + error.code);})
      this.VigiK = VigiK;

    var InTabDemandes = [];
    firebase.database().ref('/user/' + firebase.auth().currentUser.uid ).on("value", function(snapshot) {
      var tag = snapshot.val();
      tag.forEach(function(entry) {
        InTabDemandes.push(entry);
    });
   },
    function (error) {
      console.log("Error : " + error.code);
   }
   )
  
   this.TabDemandes = InTabDemandes;
   this.Telephone2 = CryptoJS.AES.decrypt(this.TabDemandes[0]['phoneNumber'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   this.Nom2 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Nom'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   this.Prenom2 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Prenom'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   this.Ad_rue2 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Ad_rue_l'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   this.Ad_postal2 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Ad_pos_l'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   this.Ad_pays2 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Ad_pay_l'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);

  var InTabUser2 = [];

  this.TabUser2 = InTabUser2;
   
  }
  
  // Vérifie que les champs sont bien remplis
  checkAg2(){
    var utc = Date.now();
    var elmpre2 = <HTMLElement>document.querySelector("#Iprenom2");
    var elmnom2 = <HTMLElement>document.querySelector("#Inom2");
    var elmtel2 = <HTMLElement>document.querySelector("#Itelephone2");
    var elmlie2 = <HTMLElement>document.querySelector("#Iliens2");
    var elmrue2 = <HTMLElement>document.querySelector("#Iad_rue2");
    var elmpos2 = <HTMLElement>document.querySelector("#Iad_postal2");
    var elmpay2 = <HTMLElement>document.querySelector("#Iad_pays2");
    
    this.TabFields[0]['UID'] = firebase.auth().currentUser.uid;
    this.TabFields[0]['Date_crea'] = utc;


    if (!this.Prenom2 || this.Prenom2.length < 1){
      elmpre2.style.borderColor = '#FF0000';
      return; }
    else {
      this.TabFields[0]['Prenom'] = CryptoJS.AES.encrypt(this.Prenom2.trim(), this.VigiK.trim()).toString();
      elmpre2.style.borderColor = 'green'; 
      }


  if (!this.Nom2 || this.Nom2.length < 1){
    elmnom2.style.borderColor = '#FF0000';
    return; }
    else {
    this.TabFields[0]['Nom'] = CryptoJS.AES.encrypt(this.Nom2.trim(), this.VigiK.trim()).toString();
    elmnom2.style.borderColor = 'green';
  }

  if (!this.Telephone2 || this.Telephone2.length < 10){
    elmtel2.style.borderColor = '#FF0000';
    return; }
    else {
    this.TabFields[0]['Telephone'] = CryptoJS.AES.encrypt(this.Telephone2.trim(), this.VigiK.trim()).toString();
    elmtel2.style.borderColor = 'green';
  }
  if (!this.Liens2 || this.Liens2.length < 2){
    elmlie2.style.background = 'rgba(255,0,0,0.2)';
    return; }
    else {
    this.TabFields[0]['Liste_envies'] = CryptoJS.AES.encrypt(this.Liens2.trim(), this.VigiK.trim()).toString();
    elmlie2.style.background = 'white';
  }

    if (!this.Ad_rue2 || this.Ad_rue2.length < 3){
    elmrue2.style.borderColor = '#FF0000';
    return; }
    else {
    this.TabFields[0]['Ad_rue_l'] = CryptoJS.AES.encrypt(this.Ad_rue2.trim(), this.VigiK.trim()).toString();
    elmrue2.style.borderColor = 'green';
  }

    if (!this.Ad_postal2 || this.Ad_postal2.length < 3){
    elmpos2.style.borderColor = '#FF0000';
    return; }
    else {
    this.TabFields[0]['Ad_postal_l'] = CryptoJS.AES.encrypt(this.Ad_postal2.trim(), this.VigiK.trim()).toString();
    elmpos2.style.borderColor = 'green';
  }

    if (!this.Ad_pays2 || this.Ad_pays2.length < 2){
    elmpay2.style.borderColor = '#FF0000';
    return; }
    else {
    this.TabFields[0]['Ad_pay_l'] = CryptoJS.AES.encrypt(this.Ad_pays2.trim(), this.VigiK.trim()).toString();
    elmpay2.style.borderColor = 'green';
  }

    if (this.Type_envoi && this.Type_envoi.length > 0)
      this.TabFields[0]['Type_envoi'] = CryptoJS.AES.encrypt(this.Type_envoi.trim(), this.VigiK.trim()).toString();
    else
      this.TabFields[0]['Type_envoi'] = CryptoJS.AES.encrypt('bateau'.trim(), this.VigiK.trim()).toString();


  this.writeUserData();
  this.presentToastBravo();
  this.nav.navigateBack('/forms');
}

  // affiche message de confirmation
  async presentToastBravo() {
  const tooast = await this.toastCtrl.create({
    message: 'Votre demande a bien été enregistrée.',
    duration: 3000,
    position: 'middle',
    color : 'success'
  })
  tooast.present();
  }

  //écrit dans la base
  writeUserData() {

    var lengtha = 0
    firebase.database().ref('/suivi_details').on("value", function(snapshot) {
      var tag = snapshot.val();
      lengtha = tag.length;
    },
    function (error) {
      console.log("Error : " + error.code);
    })
    this.TabFields[0]['i'] = lengtha.toString();
    this.TabFields[0]['id'] = lengtha.toString();
   firebase.database().ref('suivi_details/' + lengtha).set(this.TabFields[0]).then(
            (data: DataTransfer) => {
            },
            (error) => {
              console.log(error,this.TabUser2);
            }
          );

        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        var TabFirstMsg = [];
        TabFirstMsg.push({DateMsg:utc, Message:CryptoJS.AES.encrypt('Votre demande est en cours de traitement'.trim(), this.VigiK.trim()).toString(), Notification:1, UserID:'Compute'});

          firebase.database().ref('/msg_suivi/' + (lengtha-1)).set(TabFirstMsg).then(
            (data: DataTransfer) => {
            },
            (error) => {
              console.log(error,TabFirstMsg);
            }
          );
  }

  // change en blanc la couleur des champs
  setColor(idlbl) {
    let id4elem = <HTMLElement>document.querySelector(idlbl);
    if (idlbl == "#Iliens2")
      id4elem.style.backgroundColor = "";
    else
      id4elem.style.borderColor = '#FFFFFF';
  }


}
