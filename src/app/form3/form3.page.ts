import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController, NavController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.page.html',
  styleUrls: ['./form3.page.scss'],
})
export class Form3Page implements OnInit {
  VigiK="";
  Prenom3:"Prenom3";
  Nom3:"Nom3";
  Telephone3:"Telephone3";
  Ad_rue_E3:"Ad_rue_E3";
  Ad_postal_E3:"Ad_postal_E3";
  Ad_pays_E3:"Ad_pays_E3";
  Ad_rue_L3:"Ad_rue_L3";
  Ad_postal_L3:"Ad_postal_L3";
  Ad_pays_L3:"Ad_pays_L3";
  Desc_colis:"Desc_colis";

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
      Type_demande:'3',
      Type_envoi:'',
      Telephone:'',
      i:'123456',
      icon:'paper',
      id:'123456',
      Priorite:'gris',
      UID:'',
    }
  ];

  constructor(public toastCtrl: ToastController, private nav : NavController) {
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
   this.Telephone3 = CryptoJS.AES.decrypt(this.TabDemandes[0]['phoneNumber'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);

   this.Nom3 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Nom'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   this.Prenom3 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Prenom'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   this.Ad_rue_L3 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Ad_rue_l'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   this.Ad_postal_L3 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Ad_pos_l'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   this.Ad_pays_L3 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Ad_pay_l'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
  // this.Desc_colis = CryptoJS.AES.decrypt(this.TabDemandes[0]['Desc_colis'].trim(), this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   this.Ad_rue_E3 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Ad_rue_e'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   this.Ad_postal_E3 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Ad_pos_e'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   this.Ad_pays_E3 = CryptoJS.AES.decrypt(this.TabDemandes[0]['Ad_pay_e'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);
   
   
  }
  goback(){
    this.nav.navigateBack('/forms');
  }

  ngOnInit() {
  }

  // Vérifie que les champs sont bien remplis
  checkAg3(){
    var utc = Date.now();
    let elmpre3 = <HTMLElement>document.querySelector("#Iprenom3");
    let elmnom3 = <HTMLElement>document.querySelector("#Inom3");
    let elmtel3 = <HTMLElement>document.querySelector("#Itelephone3");
    let elmrueE3 = <HTMLElement>document.querySelector("#Iad_rue_e3");
    let elmposE3 = <HTMLElement>document.querySelector("#Iad_postal_e3");
    let elmpayE3 = <HTMLElement>document.querySelector("#Iad_pays_e3");
    let elmrueL3 = <HTMLElement>document.querySelector("#Iad_rue_l3");
    let elmposL3 = <HTMLElement>document.querySelector("#Iad_postal_l3");
    let elmpayL3 = <HTMLElement>document.querySelector("#Iad_pays_l3");
    let elmpayD3 = <HTMLElement>document.querySelector("#Idesc_colis");    
    
    this.TabFields[0]['UID'] = firebase.auth().currentUser.uid;
    this.TabFields[0]['Date_crea'] = utc;

    if (!this.Prenom3 || this.Prenom3.length < 1){
      elmpre3.style.borderColor = '#FF0000';
      return; }
    else {
      this.TabFields[0]['Prenom'] = CryptoJS.AES.encrypt(this.Prenom3.trim(), this.VigiK.trim()).toString();
      elmpre3.style.borderColor = 'green'; 
      }

  if (!this.Nom3 || this.Nom3.length < 1){
    elmnom3.style.borderColor = '#FF0000';
    return; }
  else {
    this.TabFields[0]['Nom'] = CryptoJS.AES.encrypt(this.Nom3.trim(), this.VigiK.trim()).toString();
    elmnom3.style.borderColor = 'green';
  }


  if (!this.Telephone3 || this.Telephone3.length < 10){
    elmtel3.style.borderColor = '#FF0000';
    return; }
  else {
    this.TabFields[0]['Telephone'] = CryptoJS.AES.encrypt(this.Telephone3.trim(), this.VigiK.trim()).toString();
    elmtel3.style.borderColor = 'green';
  }


  if (!this.Ad_rue_E3 || this.Ad_rue_E3.length < 2){
    elmrueE3.style.borderColor = '#FF0000';
    return; }
  else {
    this.TabFields[0]['Ad_rue_e'] = CryptoJS.AES.encrypt(this.Ad_rue_E3.trim(), this.VigiK.trim()).toString();
    elmrueE3.style.borderColor = 'green';
  }


  if (!this.Ad_postal_E3 || this.Ad_postal_E3.length < 2){
    elmposE3.style.borderColor = '#FF0000';
    return; }
  else {
    this.TabFields[0]['Ad_pos_e'] = CryptoJS.AES.encrypt(this.Ad_postal_E3.trim(), this.VigiK.trim()).toString();
    elmposE3.style.borderColor = 'green';
  }


  if (!this.Ad_pays_E3 || this.Ad_pays_E3.length < 2){
    elmpayE3.style.borderColor = '#FF0000';
    return; }
  else {
    this.TabFields[0]['Ad_pay_e'] = CryptoJS.AES.encrypt(this.Ad_pays_E3.trim(), this.VigiK.trim()).toString();
    elmpayE3.style.borderColor = 'green';
  }


  if (!this.Ad_rue_L3 || this.Ad_rue_L3.length < 2){
    elmrueL3.style.borderColor = '#FF0000';
    return; }
  else {
    this.TabFields[0]['Ad_rue_l'] = CryptoJS.AES.encrypt(this.Ad_pays_L3.trim(), this.VigiK.trim()).toString();
    elmrueL3.style.borderColor = 'green';
  }


  if (!this.Ad_postal_L3 || this.Ad_postal_L3.length < 2){
    elmposL3.style.borderColor = '#FF0000';
    return; }
  else {
    this.TabFields[0]['Ad_pos_l'] = CryptoJS.AES.encrypt(this.Ad_postal_L3.trim(), this.VigiK.trim()).toString();
    elmposL3.style.borderColor = 'green';
  }


  if (!this.Ad_pays_L3 || this.Ad_pays_L3.length < 2){
    elmpayL3.style.borderColor = '#FF0000';
    return; }
  else {
    this.TabFields[0]['Ad_pay_l'] = CryptoJS.AES.encrypt(this.Ad_pays_L3.trim(), this.VigiK.trim()).toString();
    elmpayL3.style.borderColor = 'green';
  }
  if (!this.Desc_colis || this.Desc_colis.length < 4){
    elmpayD3.style.background = 'rgba(255, 0, 0, 0.2)';
    return; }
    else {
    this.TabFields[0]['Desc_colis'] = CryptoJS.AES.encrypt(this.Desc_colis.trim(), this.VigiK.trim()).toString();
    elmpayD3.style.background = 'white';
  }



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
      id4elem.style.borderColor = '#FFFFFF';
  }

}
